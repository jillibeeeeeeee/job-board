// Get a reference to the search bar and the job listing elements on the page
const searchBar = document.getElementById("search");
const jobListingsSection = document.getElementById("jobListings");



// Define a function to filter the job listings based on the search term
function filterJobListings(searchTerm, jobListings) {
  // Loop through each job listing element on the page
  jobListings.forEach((jobListing) => {
    // Get the text content of the job listing element
    const jobText = jobListing.textContent.toLowerCase();

    // Check if the search term appears in the job listing text
    if (jobText.includes(searchTerm.toLowerCase())) {
      // If it does, display the job listing element
      jobListing.style.display = "block";
    } else {
      // If it doesn't, hide the job listing element
      jobListing.style.display = "none";
    }

  });
}

// Add an event listener to the search bar that will call the filterJobListings function on input
searchBar.addEventListener("input", (event) => {
  const searchTerm = event.target.value;
  const jobListings = document.querySelectorAll(".job-listing");
  filterJobListings(searchTerm, jobListings);
});

// Add an event listener to the form that will call the filterJobListings function on submit
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the form from submitting
  const searchTerm = form.search.value;
  const jobListings = document.querySelectorAll(".job-card");
  filterJobListings(searchTerm, jobListings);
});


// Fetch the job listings JSON data from a URL or file
fetch('jobs-data.json')
  .then(response => response.json())
  .then(data => {

    // Get a reference to the job listings section on the page
    const jobListingsSection = document.getElementById("job-listings");

    // Loop through each job listing in the JSON data
    data.jobs.forEach(job => {
      // Create a new job listing card
      const jobCard = document.createElement("div");
      jobCard.classList.add("job-card");


      // Add the job title
      const title = document.createElement("h3");
      title.textContent = job.title;
      jobCard.appendChild(title);

      // Add the company name
      const company = document.createElement("h4");
      company.textContent = job.company;
      jobCard.appendChild(company);

      // Add the location
      const location = document.createElement("p-location");
      location.textContent = job.location;

      jobCard.appendChild(location);

      // Add the job description
      const description = document.createElement("p-description");
      description.textContent = job.description;
      jobCard.appendChild(description);

      // Add the apply button
      const applyButton = document.createElement("a");
      applyButton.href = "apply.html";
      applyButton.textContent = "Apply Now";
      jobCard.appendChild(applyButton);

      // Add the job listing card to the job listings section
      jobListingsSection.appendChild(jobCard);
    });

  })
  .catch(error => {
    console.error('Error fetching job listings:', error);
  });


  