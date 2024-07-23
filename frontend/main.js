window.addEventListener('DOMContentLoaded', (event) => {
  getVisitCount();
});

const functionApi = 'http://localhost:7071/api/counter';

const getVisitCount = () => {
  fetch(functionApi)
      .then(response => response.json())
      .then(response => {
          console.log("Website called function API.");
          const count = response.count;
          document.getElementById("counter").innerText = count;
      })
      .catch(error => {
          console.error('Error fetching the visit count:', error);
      });
};
