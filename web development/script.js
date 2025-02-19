// Load posts from local storage
document.addEventListener("DOMContentLoaded", loadPosts);

function openPostForm() {
    document.getElementById("post-modal").style.display = "flex";
}

function closePostForm() {
    document.getElementById("post-modal").style.display = "none";
}

// Function to add a new post
function addPost() {
    let title = document.getElementById("post-title").value;
    let content = document.getElementById("post-content").value;

    if (title.trim() === "" || content.trim() === "") {
        alert("Title and content cannot be empty!");
        return;
    }

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let newPost = { title, content };

    posts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));

    document.getElementById("post-title").value = "";
    document.getElementById("post-content").value = "";
    closePostForm();
    loadPosts();
}

// Function to load posts
function loadPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let postContainer = document.getElementById("blog-posts");
    postContainer.innerHTML = "";

    posts.forEach((post, index) => {
        let postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <button class="delete-btn" onclick="deletePost(${index})">Delete</button>
        `;
        postContainer.appendChild(postElement);
    });
}

// Function to delete a post
function deletePost(index) {
    let posts = JSON.parse(localStorage.getItem("posts"));
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}
