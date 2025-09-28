document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURAÇÕES E SELETORES ---
    const API_URL = 'http://127.0.0.1:5000/api/v1/books/';

    // Formulário de Adição
    const addBookForm = document.getElementById('add-book-form');
    
    // Lista de Livros
    const bookList = document.getElementById('book-list');

    // Modal de Edição
    const editModal = document.getElementById('edit-modal');
    const editBookForm = document.getElementById('edit-book-form');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    const editBookId = document.getElementById('edit-book-id');

    // --- FUNÇÕES DA API ---

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

    const renderBooks = (books) => {
        bookList.innerHTML = ''; 
        if (books.length === 0) {
            bookList.innerHTML = '<p>Nenhum livro cadastrado ainda.</p>';
            return;
        }

        books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            
            // CORRIGIDO: Usando 'imagem_url' que vem da sua API
            const imageUrl = book.imagem_url || 'https://via.placeholder.com/300x400.png?text=Sem+Capa';

            bookCard.innerHTML = `
                <div class="book-cover">
                    <img src="${imageUrl}" alt="Capa do livro: ${book.titulo}" onerror="this.onerror=null;this.src='https://via.placeholder.com/300x400.png?text=Erro+na+URL';">
                </div>
                <div class="book-info">
                    <h3>${book.titulo}</h3>
                    <p><strong>Autor(es):</strong> ${book.autores}</p>
                    <p><strong>Páginas:</strong> ${book.paginas}</p>
                    <p><strong>Ano:</strong> ${book.ano_publicacao}</p>
                    <div class="book-actions">
                        <button class="btn btn-secondary edit-btn" data-id="${book.id}">Editar</button>
                        <button class="btn btn-danger delete-btn" data-id="${book.id}">Remover</button>
                    </div>
                </div>
            `;
            bookList.appendChild(bookCard);

            bookCard.querySelector('.edit-btn').addEventListener('click', () => openEditModal(book));
            bookCard.querySelector('.delete-btn').addEventListener('click', () => deleteBook(book.id));
        });
    };

    const addBook = async (event) => {
        event.preventDefault();
        const formData = new FormData(addBookForm);
        const bookData = {
            titulo: formData.get('titulo'),
            autores: formData.get('autores'),
            paginas: parseInt(formData.get('paginas')),
            ano_publicacao: parseInt(formData.get('ano_publicacao')),
            imagem_url: formData.get('url_imagem') // CORRIGIDO: Enviando 'imagem_url' para a API
        };
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookData),
            });
            if (!response.ok) throw new Error('Falha ao criar livro.');
            addBookForm.reset();
            fetchBooks();
        } catch (error) {
            console.error('Erro ao adicionar livro:', error);
            alert('Não foi possível adicionar o livro.');
        }
    };

    const deleteBook = async (bookId) => {
        if (!confirm('Tem certeza que deseja remover este livro?')) return;
        try {
            const response = await fetch(`${API_URL}${bookId}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Falha ao remover livro.');
            fetchBooks();
        } catch (error) {
            console.error('Erro ao remover livro:', error);
            alert('Não foi possível remover o livro.');
        }
    };
    
    const openEditModal = (book) => {
        editBookId.value = book.id;
        document.getElementById('edit-titulo').value = book.titulo;
        document.getElementById('edit-autores').value = book.autores;
        document.getElementById('edit-paginas').value = book.paginas;
        document.getElementById('edit-ano_publicacao').value = book.ano_publicacao;
        document.getElementById('edit-url_imagem').value = book.imagem_url; // CORRIGIDO: Lendo 'imagem_url' para preencher o formulário
        editModal.style.display = 'flex';
    };

    const closeEditModal = () => { editModal.style.display = 'none'; };

    const updateBook = async (event) => {
        event.preventDefault();
        const bookId = editBookId.value;
        const bookData = {
            titulo: document.getElementById('edit-titulo').value,
            autores: document.getElementById('edit-autores').value,
            paginas: parseInt(document.getElementById('edit-paginas').value),
            ano_publicacao: parseInt(document.getElementById('edit-ano_publicacao').value),
            imagem_url: document.getElementById('edit-url_imagem').value // CORRIGIDO: Enviando 'imagem_url' na atualização
        };
        try {
            const response = await fetch(`${API_URL}${bookId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookData),
            });
            if (!response.ok) throw new Error('Falha ao atualizar livro.');
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
        if (event.target === editModal) closeEditModal();
    });

    fetchBooks();
});