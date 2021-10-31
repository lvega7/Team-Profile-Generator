function generateMarkdown(data) {
    return `# ${data.name}
    
    ${data.id}
    ${data.email}
  
  `;
  }
  
  module.exports = generateMarkdown;