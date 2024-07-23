window.addEventListener('DOMContentLoaded', (event) => {
  getVisitCount();
});

const functionApiLocal = 'http://localhost:7071/api/counter';
const functionApi = 'https://lukegetresumecounter.azurewebsites.net/api/counter?code=qh6udrYuSMiU5WWKuNiACGm02sYbOF4o5_zPJ8RUFhvfAzFuSX6iNw%3D%3D';


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
