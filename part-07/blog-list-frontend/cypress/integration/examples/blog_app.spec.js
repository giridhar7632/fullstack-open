describe('Blog list app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:5000/api/testing/reset')
		const user = {
			name: 'Tester',
			username: 'tester',
			password: '@tester',
		}
		cy.request('POST', 'http://localhost:5000/api/users/', user)
		cy.visit('http://localhost:3000')
	})

	it('front page can be opened', function () {
		cy.contains('login')
	})

	it('Login form is shown', function () {
		cy.contains('login').click()
		cy.get('form').contains('login')
	})

	describe('Login', function () {
		it('user can login', function () {
			cy.contains('login').click()
			cy.get('#username').type('tester')
			cy.get('#password').type('@tester')
			cy.get('#login-button').click()

			cy.contains('Tester logged-in')
		})

		it('login fails with wrong password', function () {
			cy.contains('login').click()
			cy.get('#username').type('tester')
			cy.get('#password').type('wrong')
			cy.get('#login-button').click()

			cy.get('.error').contains('Wrong credentials')
			cy.get('.error')
				.should('have.css', 'color', 'rgb(255, 0, 0)')
				.and('have.css', 'border-style', 'solid')
		})
	})

	describe('When logged in', function () {
		beforeEach(function () {
			cy.login({ username: 'tester', password: '@tester' })

			cy.createBlog({
				title: 'First Blog',
				author: 'firstblogger',
				url: 'first.url',
				likes: 3,
			})
			cy.createBlog({
				title: 'Second Blog',
				author: 'secondblogger',
				url: 'second.url',
				likes: 2,
			})
			cy.createBlog({
				title: 'Third Blog',
				author: 'thirdblogger',
				url: 'third.url',
				likes: 1,
			})

			cy.contains('login').click()
			cy.get('#username').type('tester')
			cy.get('#password').type('@tester')
			cy.get('#login-button').click()
		})

		it('a new blog can be added', function () {
			cy.contains('Create new blog').click()
			cy.get('#title').type('title')
			cy.get('#author').type('author')
			cy.get('#url').type('url')
			cy.get('#likes').type(5)
			cy.get('#createBlog').click()

			cy.get('.success')
				.should('contain', 'a new blog title by author')
				.and('have.css', 'color', 'rgb(0, 128, 0)')

			cy.get('.blog-list').within(() => {
				cy.get('.blog:last').should('contain', 'title').and('contain', 'author')
			})
		})

		it('user can like', function () {
			cy.contains('view').click()
			cy.get(
				':nth-child(1) > .showWhenVisible > :nth-child(1) > .togglableContent > .like-btn'
			).click()
		})

		it('user can remove a blog', function () {
			cy.contains('Create new blog').click()
			cy.get('#title').type('remtitle')
			cy.get('#author').type('remauthor')
			cy.get('#url').type('remurl')
			cy.get('#likes').type(0)
			cy.get('#createBlog').click()

			cy.contains('view').click()
			cy.get('.remove')
		})

		it('Unauthorized user cannot delete a blog', function () {
			cy.request('POST', 'http://localhost:5000/api/users', {
				name: 'unAuth',
				username: 'unauth',
				password: '@unauth',
			})
			cy.get('#logout').click()
			cy.reload()
			cy.contains('login').click()
			cy.get('#username').type('unauth')
			cy.get('#password').type('@unauth')
			cy.get('#login-button').click()

			cy.get(
				':nth-child(3) > .showWhenVisible > :nth-child(1) > :nth-child(1) > .togglableButton'
			).click()
			cy.get('.blog-list > :nth-child(3)').within(() => {
				cy.get('.remove').should('not.exist')
			})
		})

		it('The blogs order changes if it gets more likes than the blog above', function () {
			// order in beginning
			cy.get('.blog')
				.should('have.length', 3)
				.then((blogs) => {
					cy.wrap(blogs[0]).should('contain', 'First Blog')
					cy.wrap(blogs[1]).should('contain', 'Second Blog')
					cy.wrap(blogs[2]).should('contain', 'Third Blog')
				})

			cy.get('.blog')
				.last()
				.within(() => {
					cy.get('.togglableButton').click()
					cy.get('.like-btn').click()
					cy.wait(1500)
					cy.get('.like-btn').click()
				})
		})
	})
})
