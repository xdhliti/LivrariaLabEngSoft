document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://127.0.0.1:5000/api/v1/books/';

    const addBookForm = document.getElementById('add-book-form');

    const bookList = document.getElementById('book-list');

    const editModal = document.getElementById('edit-modal');
    const editBookForm = document.getElementById('edit-book-form');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    const editBookId = document.getElementById('edit-book-id');


    const fetchBooks = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Falha ao buscar livros.');
            }
            const books = await response.json();
            renderBooks(books);
        } catch (error) {
            console.error('Erro:', error);
            bookList.innerHTML = `<p class="error-message">Não foi possível carregar os livros. Verifique se a API está rodando.</p>`;
        }
    };

    /**
     * Renderiza a lista de livros no HTML.
     * @param {Array} books - A lista de livros a ser renderizada.
     */
    const renderBooks = (books) => {
        bookList.innerHTML = '';

        if (books.length === 0) {
            bookList.innerHTML = '<p>Nenhum livro cadastrado ainda.</p>';
            return;
        }

        books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            bookCard.innerHTML = `
                <h3>${book.titulo}</h3>
                <p><strong>Autor(es):</strong> ${book.autores}</p>
                <p><strong>Páginas:</strong> ${book.paginas}</p>
                <p><strong>Ano:</strong> ${book.ano_publicacao}</p>
                <div class="book-actions">
                    <button class="btn btn-secondary edit-btn" data-id="${book.id}">Editar</button>
                    <button class="btn btn-danger delete-btn" data-id="${book.id}">Remover</button>
                </div>
            `;
            bookList.appendChild(bookCard);

            // Adiciona eventos aos botões do card
            bookCard.querySelector('.edit-btn').addEventListener('click', () => openEditModal(book));
            bookCard.querySelector('.delete-btn').addEventListener('click', () => deleteBook(book.id));
        });
    };

    /**
     * Adiciona um novo livro.
     * @param {Event} event - O evento de submit do formulário.
     */
    const addBook = async (event) => {
        event.preventDefault();

        const formData = new FormData(addBookForm);
        const bookData = {
            titulo: formData.get('titulo'),
            autores: formData.get('autores'),
            paginas: parseInt(formData.get('paginas')),
            ano_publicacao: parseInt(formData.get('ano_publicacao')),
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookData),
            });

            if (!response.ok) {
                throw new Error('Falha ao criar livro.');
            }

            addBookForm.reset();
            fetchBooks(); 
        } catch (error) {
            console.error('Erro ao adicionar livro:', error);
            alert('Não foi possível adicionar o livro.');
        }
    };

    /**
     * Remove um livro.
     * @param {string} bookId - O ID do livro a ser removido.
     */
    const deleteBook = async (bookId) => {
        if (!confirm('Tem certeza que deseja remover este livro?')) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}${bookId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Falha ao remover livro.');
            }

            fetchBooks(); 
        } catch (error) {
            console.error('Erro ao remover livro:', error);
            alert('Não foi possível remover o livro.');
        }
    };
    
    /**
     * Abre e preenche o modal de edição com os dados do livro.
     * @param {object} book - O objeto do livro a ser editado.
     */
    const openEditModal = (book) => {
        editBookId.value = book.id;
        document.getElementById('edit-titulo').value = book.titulo;
        document.getElementById('edit-autores').value = book.autores;
        document.getElementById('edit-paginas').value = book.paginas;
        document.getElementById('edit-ano_publicacao').value = book.ano_publicacao;
        editModal.style.display = 'flex';
    };

    const closeEditModal = () => {
        editModal.style.display = 'none';
    };

    /**
     * Atualiza um livro existente.
     * @param {Event} event - O evento de submit do formulário de edição.
     */
    const updateBook = async (event) => {
        event.preventDefault();
        
        const bookId = editBookId.value;
        const bookData = {
            titulo: document.getElementById('edit-titulo').value,
            autores: document.getElementById('edit-autores').value,
            paginas: parseInt(document.getElementById('edit-paginas').value),
            ano_publicacao: parseInt(document.getElementById('edit-ano_publicacao').value),
        };

        try {
            const response = await fetch(`${API_URL}${bookId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookData),
            });

            if (!response.ok) {
                throw new Error('Falha ao atualizar livro.');
            }

            closeEditModal();
            fetchBooks();
        } catch (error) {
            console.error('Erro ao atualizar livro:', error);
            alert('Não foi possível atualizar o livro.');
        }
    };

    addBookForm.addEventListener('submit', addBook);
    
    editBookForm.addEventListener('submit', updateBook);

    cancelEditBtn.addEventListener('click', closeEditModal);
    editModal.addEventListener('click', (event) => {
        if (event.target === editModal) {
            closeEditModal();
        }
    });


    fetchBooks();
});