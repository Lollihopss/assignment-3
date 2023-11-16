/* 
   Name: Hope Matthews 
   Email: mattheho@oregonstate.edu 
*/

document.addEventListener('DOMContentLoaded', function () {
  // Get references to DOM elements
  const sellSomethingButton = document.getElementById('sell-something-button');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const sellSomethingModal = document.getElementById('sell-something-modal');
  const modalCloseButton = document.getElementById('modal-close');
  const modalCancelButton = document.getElementById('modal-cancel');
  const modalAcceptButton = document.getElementById('modal-accept');
  const filterUpdateButton = document.getElementById('filter-update-button');

  // Event listener for opening the modal
  sellSomethingButton.addEventListener('click', function () {
    // Display the modal when the button is clicked
    modalBackdrop.classList.remove('hidden');
    sellSomethingModal.classList.remove('hidden');
  });

  // Event listener for closing the modal
  function closeModal() {
    // Hide the modal and clear input fields when closing
    modalBackdrop.classList.add('hidden');
    sellSomethingModal.classList.add('hidden');
    clearModalInputs();
  }

  // Attach close modal function to close buttons
  modalCloseButton.addEventListener('click', closeModal);
  modalCancelButton.addEventListener('click', closeModal);

  // Event listener for accepting the modal and creating a new post
  modalAcceptButton.addEventListener('click', function () {
    // Retrieve values from input fields
    const itemDescription = document.getElementById('post-text-input').value.trim();
    const photoURL = document.getElementById('post-photo-input').value.trim();
    const price = document.getElementById('post-price-input').value.trim();
    const city = document.getElementById('post-city-input').value.trim();
    const condition = document.querySelector('input[name="post-condition"]:checked').value;

    // Check if any of the required fields are empty
    if (!itemDescription || !photoURL || !price || !city) {
      // Alert the user if any field is empty
      alert('Please fill in all fields before creating a post.');
      return;
    }

    // Create a new post element
    const newPost = createPostElement(itemDescription, photoURL, price, city, condition);

    // Append the new post to the posts container
    const postsContainer = document.getElementById('posts');
    postsContainer.appendChild(newPost);

    // Close the modal and clear input fields
    closeModal();
  });

  // Event listener for updating filters and filtering posts
  filterUpdateButton.addEventListener('click', function () {
    // Call the filterPosts function when the filter button is clicked
    filterPosts();
  });

  // Helper function to create a new post element
  function createPostElement(itemDescription, photoURL, price, city, condition) {
    const post = document.createElement('div');
    post.className = 'post';
    post.setAttribute('data-price', price);
    post.setAttribute('data-city', city);
    post.setAttribute('data-condition', condition);

    const postContents = document.createElement('div');
    postContents.className = 'post-contents';

    const postImageContainer = document.createElement('div');
    postImageContainer.className = 'post-image-container';

    const img = document.createElement('img');
    img.src = photoURL;
    img.alt = itemDescription;

    const postInfoContainer = document.createElement('div');
    postInfoContainer.className = 'post-info-container';

    const postTitle = document.createElement('a');
    postTitle.href = '#';
    postTitle.className = 'post-title';
    postTitle.textContent = itemDescription;

    const postPrice = document.createElement('span');
    postPrice.className = 'post-price';
    postPrice.textContent = `$${price}`;

    const postCity = document.createElement('span');
    postCity.className = 'post-city';
    postCity.textContent = `(${city})`;

    // Append elements to their respective parents
    postImageContainer.appendChild(img);
    postInfoContainer.appendChild(postTitle);
    postInfoContainer.appendChild(postPrice);
    postInfoContainer.appendChild(postCity);
    postContents.appendChild(postImageContainer);
    postContents.appendChild(postInfoContainer);
    post.appendChild(postContents);

    return post;
  }

  // Helper function to clear input fields in the modal
  function clearModalInputs() {
    // Clear input fields in the modal
    document.getElementById('post-text-input').value = '';
    document.getElementById('post-photo-input').value = '';
    document.getElementById('post-price-input').value = '';
    document.getElementById('post-city-input').value = '';
    document.getElementById('post-condition-new').checked = true;
  }

  // Helper function to filter posts based on user input
  function filterPosts() {
    // Retrieve filter values from the DOM
    const textFilter = document.getElementById('filter-text').value.trim().toLowerCase();
    const minPriceFilter = parseFloat(document.getElementById('filter-min-price').value) || 0;
    const maxPriceFilter = parseFloat(document.getElementById('filter-max-price').value) || Infinity;
    const cityFilter = document.getElementById('filter-city').value.trim().toLowerCase();
    const conditionFilters = Array.from(document.querySelectorAll('input[name="filter-condition"]:checked')).map(input => input.value);

    // Retrieve all post elements
    const posts = Array.from(document.getElementsByClassName('post'));

    // Iterate through each post and apply filters
    posts.forEach(post => {
      const postText = post.querySelector('.post-title').textContent.toLowerCase();
      const postPrice = parseFloat(post.getAttribute('data-price'));
      const postCity = post.getAttribute('data-city').toLowerCase();
      const postCondition = post.getAttribute('data-condition');

      // Check if the post matches the applied filters
      const textMatch = !textFilter || postText.includes(textFilter);
      const priceMatch = postPrice >= minPriceFilter && postPrice <= maxPriceFilter;
      const cityMatch = !cityFilter || postCity === cityFilter;
      const conditionMatch = conditionFilters.length === 0 || conditionFilters.includes(postCondition);

      // Show or hide the post based on filter matches
      if (textMatch && priceMatch && cityMatch && conditionMatch) {
        post.classList.remove('hidden');
      } else {
        post.classList.add('hidden');
      }
    });
  }
});
