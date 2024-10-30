
// filter books 
let books__links = document.querySelectorAll(".books .link");
let box__content = document.querySelectorAll(".box-content");
let booksContainerRow = document.querySelector(".booksContainer");

books__links.forEach((link) => {
    link.addEventListener("click", function (e) {
        books__links.forEach((link) => {
            link.classList.remove("active");
        });
        e.currentTarget.classList.add("active");

        let category = e.currentTarget.dataset.cat;

        // Hide all books initially
        document.querySelectorAll(".box-content").forEach((box) => {
            box.style.display = "none";
        });

        // Show books of the selected category and rearrange their order
        let booksToShow = document.querySelectorAll(category);
        booksToShow.forEach((book) => {
            book.style.display = "block";
            booksContainerRow.appendChild(book);
        });

    });
});