document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Get assignment ID from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const assignmentId = urlParams.get('id');
    
    if (!assignmentId) {
        window.location.href = 'index.html'; // Redirect if no ID is provided
        return;
    }
    
    // Add scroll effect for header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Fetch assignment data
    fetch('assignments.json')
        .then(response => response.json())
        .then(data => {
            const assignments = data.assignments;
            const assignment = assignments.find(a => a.id === assignmentId);
            
            if (!assignment) {
                document.getElementById('assignment-title').textContent = 'Assignment not found';
                return;
            }
            
            // Set assignment title with animation
            const titleElement = document.getElementById('assignment-title');
            titleElement.textContent = '';
            
            // Add animation for title
            setTimeout(() => {
                const title = assignment.title;
                let i = 0;
                const typeWriter = () => {
                    if (i < title.length) {
                        titleElement.textContent += title.charAt(i);
                        i++;
                        setTimeout(typeWriter, 30);
                    }
                };
                typeWriter();
            }, 300);
            
            document.title = `${assignment.title} - Assignments Portfolio`;
            
            // Load PDF document with simpler approach
            loadPdfWithEmbed(assignment.docPath, assignment.title);
            
            // Load solution file
            loadSolutionFile(assignment.filePath, assignment.fileType);
            
            // Configure the preview button
            const previewBtn = document.getElementById('preview-btn');
            previewBtn.addEventListener('click', () => {
                if (assignment.fileType === 'html') {
                    window.open(assignment.filePath, '_blank');
                } else if (assignment.fileType === 'css') {
                    window.open(assignment.filePath, '_blank');
                } 
                else if (assignment.fileType === 'js') {
                    // Create a preview HTML file dynamically with the JS content
                    createPreviewPage(assignment);
                }
                
                // Add click animation
                previewBtn.classList.add('button-clicked');
                setTimeout(() => {
                    previewBtn.classList.remove('button-clicked');
                }, 300);
            });
        })
        .catch(error => {
            console.error('Error fetching assignment data:', error);
            document.getElementById('assignment-title').textContent = 'Error loading assignment';
        });
    
    // Tab functionality with animation
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            btn.classList.add('active');
            const tabId = `${btn.getAttribute('data-tab')}-tab`;
            const targetPane = document.getElementById(tabId);
            
            // Add animation to tab change
            targetPane.classList.add('tab-changing');
            setTimeout(() => {
                targetPane.classList.add('active');
                targetPane.classList.remove('tab-changing');
            }, 150);
        });
    });
    
    // Theme toggle functionality with animation
    document.getElementById('theme-toggle-btn').addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Add transition class for smooth theme change
        document.body.classList.add('theme-transition');
        
        // Set new theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Remove transition class after animation completes
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 500);
        
        // Add a subtle animation to the toggle button
        const toggleBtn = document.getElementById('theme-toggle-btn');
        toggleBtn.classList.add('theme-toggled');
        setTimeout(() => {
            toggleBtn.classList.remove('theme-toggled');
        }, 500);
    });
});

// Simpler PDF loading approach using direct embedding for better compatibility
// Replace the loadPdfWithEmbed function with this updated version
function loadPdfWithEmbed(pdfPath, title) {
    const docxContainer = document.getElementById('docx-container');
    
    // Show loading indicator first
    docxContainer.innerHTML = '<div class="loading">Loading PDF document...</div>';
    
    // Use multiple approaches for better compatibility
    docxContainer.innerHTML = `
        <div class="pdf-container">
            <!-- Try iframe first (most compatible) -->
            <iframe 
                src="${pdfPath}" 
                width="100%" 
                height="600px"
                class="pdf-iframe"
                style="border: 1px solid #ddd; border-radius: 8px;"
                onload="this.style.display='block'; document.querySelector('.pdf-fallback').style.display='none';"
                onerror="this.style.display='none'; document.querySelector('.pdf-fallback').style.display='block';"
            ></iframe>
            
            <!-- Fallback: object tag -->
            <object 
                data="${pdfPath}" 
                type="application/pdf" 
                width="100%" 
                height="600px"
                class="pdf-object"
                style="display: none; border: 1px solid #ddd; border-radius: 8px;"
            >
                <!-- Fallback: embed tag -->
                <embed 
                    src="${pdfPath}" 
                    type="application/pdf" 
                    width="100%" 
                    height="600px"
                    class="pdf-embed"
                    style="border: 1px solid #ddd; border-radius: 8px;"
                />
            </object>
            
            <!-- Final fallback message -->
            <div class="pdf-fallback" style="display: none; padding: 20px; text-align: center; border: 2px dashed #ccc; border-radius: 8px; margin: 20px 0;">
                <h3>PDF Preview Not Available</h3>
                <p>Your browser doesn't support inline PDF viewing. Please use the buttons below to view the document:</p>
            </div>
            
            <!-- Action buttons -->
            <div class="document-actions" style="margin-top: 20px; display: flex; gap: 10px; justify-content: center;">
                <a href="${pdfPath}" class="btn btn-primary" target="_blank" style="text-decoration: none;">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="18" height="18">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                    Open in New Tab
                </a>
                <a href="${pdfPath}" class="btn btn-outline" download style="text-decoration: none;">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="18" height="18">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Download PDF
                </a>
            </div>
        </div>
    `;
    
    // Enhanced error handling with fallback cascade
    setTimeout(() => {
        const iframe = docxContainer.querySelector('.pdf-iframe');
        const objectElement = docxContainer.querySelector('.pdf-object');
        const fallbackDiv = docxContainer.querySelector('.pdf-fallback');
        
        // Check if iframe loaded successfully
        if (iframe) {
            iframe.onload = function() {
                try {
                    // Try to access iframe content to verify it loaded
                    iframe.contentDocument || iframe.contentWindow.document;
                } catch (e) {
                    // If we can't access content, try object fallback
                    iframe.style.display = 'none';
                    objectElement.style.display = 'block';
                    
                    // If object also fails, show final fallback
                    setTimeout(() => {
                        const objectFailed = !objectElement.contentDocument;
                        if (objectFailed) {
                            objectElement.style.display = 'none';
                            fallbackDiv.style.display = 'block';
                        }
                    }, 2000);
                }
            };
            
            iframe.onerror = function() {
                iframe.style.display = 'none';
                objectElement.style.display = 'block';
                
                setTimeout(() => {
                    fallbackDiv.style.display = 'block';
                }, 1000);
            };
        }
    }, 100);
}

// Load solution file with improved UX
async function loadSolutionFile(filePath, fileType) {
    try {
        const codeBlock = document.getElementById('code-block');
        const runBtn = document.getElementById('run-btn');
        
        // Show loading indicator
        codeBlock.innerHTML = '<div class="code-loading">Loading code...</div>';
        
        // Set the appropriate language class for syntax highlighting
        codeBlock.className = `language-${fileType}`;
        
        // Show/hide run button based on file type
        if (fileType === 'js') {
            runBtn.style.display = 'flex';
            runBtn.addEventListener('click', () => {
                // Add click animation
                runBtn.classList.add('button-clicked');
                setTimeout(() => {
                    runBtn.classList.remove('button-clicked');
                }, 300);
                
                executeJavaScript(filePath);
            });
        } else {
            runBtn.style.display = 'none';
        }
        
        // Fetch the file content
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load file: ${response.status} ${response.statusText}`);
        }
        
        const code = await response.text();
        
        // Display the code with syntax highlighting and animation
        codeBlock.textContent = code;
        Prism.highlightElement(codeBlock);
        
        // Add line numbers animation
        const codeContainer = document.getElementById('code-container');
        codeContainer.classList.add('code-loaded');
    } catch (error) {
        console.error('Error loading solution file:', error);
        document.getElementById('code-block').textContent = `Error loading solution file: ${error.message}`;
    }
}

// Execute JavaScript code with enhanced feedback
async function executeJavaScript(filePath) {
    try {
        const outputContainer = document.getElementById('output-container');
        const outputContent = document.getElementById('output-content');
        
        // Show loading indicator with animation
        outputContainer.style.display = 'block';
        outputContainer.className = 'output-container';
        outputContent.innerHTML = '<div class="loading">Executing code...</div>';
        
        // Fetch the JS file
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load file: ${response.status} ${response.statusText}`);
        }
        
        const code = await response.text();
        
        // Direct execution approach instead of iframe
        const logs = [];
        const originalConsoleLog = console.log;
        
        // Override console.log to capture output
        console.log = function(...args) {
            logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '));
            originalConsoleLog.apply(console, args);
        };
        
        // Execute the code directly
        let result;
        let error = null;
        
        try {
            // Create a function from the code and execute it
            const executeFunction = new Function(code);
            result = executeFunction();
        } catch (err) {
            error = err.message;
        }
        
        // Restore original console.log
        console.log = originalConsoleLog;
        
        // Create animated output display
        if (error) {
            outputContent.innerHTML = '';
            setTimeout(() => {
                outputContent.innerHTML = `
                    <div class="error-message">
                        <h4>Error:</h4>
                        <pre>${escapeHtml(error)}</pre>
                    </div>
                `;
                outputContainer.classList.add('error-container');
                outputContainer.classList.remove('output-container');
            }, 300);
        } else {
            // Reset and animate in the results
            outputContainer.classList.add('output-container');
            outputContainer.classList.remove('error-container');
            
            outputContent.innerHTML = '';
            
            setTimeout(() => {
                let outputHTML = '';
                
                // Add logs
                if (logs.length > 0) {
                    outputHTML += `
                        <div class="console-output">
                            <h4>Console Output:</h4>
                            <pre>${logs.map(log => escapeHtml(log)).join('\n')}</pre>
                        </div>
                    `;
                }
                
                // Add result if it exists and is not undefined
                if (result !== undefined && result !== null) {
                    let resultOutput;
                    
                    if (typeof result === 'object') {
                        resultOutput = JSON.stringify(result, null, 2);
                    } else {
                        resultOutput = String(result);
                    }
                    
                    outputHTML += `
                        <div class="result-output">
                            <h4>Result:</h4>
                            <pre>${escapeHtml(resultOutput)}</pre>
                        </div>
                        `;
                    }
                    
                    outputContent.innerHTML = outputHTML || '<p>Code executed with no output.</p>';
                }, 300);
            }
    } catch (error) {
        console.error('Error executing JavaScript:', error);
        const outputContainer = document.getElementById('output-container');
        const outputContent = document.getElementById('output-content');
        
        outputContainer.style.display = 'block';
        outputContainer.classList.add('error-container');
        outputContainer.classList.remove('output-container');
        outputContent.innerHTML = `<p>Error executing code: ${escapeHtml(error.message)}</p>`;
    }
}

// Create a preview page for JS files
function createPreviewPage(assignment) {
    const previewWindow = window.open('', '_blank');
    
    if (!previewWindow) {
        alert('Pop-up blocked! Please allow pop-ups and try again.');
        return;
    }
    
    // Show loading state in new window
    previewWindow.document.open();
    previewWindow.document.write(`
        <html>
        <head>
            <title>Loading ${assignment.title}...</title>
            <style>
                body {
                    font-family: 'Poppins', sans-serif;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    background-color: #f5f7fa;
                }
                .loader {
                    border: 5px solid #f3f3f3;
                    border-top: 5px solid #3b82f6;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        </head>
        <body>
            <div class="loader"></div>
        </body>
        </html>
    `);
    
    fetch(assignment.filePath)
        .then(response => response.text())
        .then(code => {
            const htmlContent = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${assignment.title} Preview</title>
                    <style>
                        :root {
                            --bg-color: #f5f7fa;
                            --text-color: #2d3748;
                            --accent-color: #3b82f6;
                            --accent-hover: #2563eb;
                            --code-bg: #f8fafc;
                            --output-bg: #f0f9ff;
                            --error-bg: #fff5f5;
                            --error-color: #ef4444;
                            --border-color: #e2e8f0;
                        }
                        
                        @media (prefers-color-scheme: dark) {
                            :root {
                                --bg-color: #1a202c;
                                --text-color: #f7fafc;
                                --accent-color: #4299e1;
                                --accent-hover: #63b3ed;
                                --code-bg: #2d3748;
                                --output-bg: #2c3e50;
                                --error-bg: #3b1c1c;
                                --error-color: #f56565;
                                --border-color: #4a5568;
                            }
                        }
                        
                        body {
                            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                            line-height: 1.6;
                            color: var(--text-color);
                            max-width: 800px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: var(--bg-color);
                            transition: background-color 0.3s ease;
                        }
                        
                        h1 {
                            color: var(--accent-color);
                            border-bottom: 1px solid var(--border-color);
                            padding-bottom: 10px;
                            font-weight: 600;
                        }
                        
                        pre {
                            background-color: var(--code-bg);
                            border-radius: 6px;
                            padding: 15px;
                            overflow: auto;
                            font-family: Consolas, Monaco, 'Andale Mono', monospace;
                            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                            transition: box-shadow 0.3s ease;
                        }
                        
                        pre:hover {
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
                        }
                        
                        .output {
                            margin-top: 20px;
                            padding: 15px;
                            background-color: var(--output-bg);
                            border-left: 4px solid var(--accent-color);
                            border-radius: 6px;
                            animation: fadeIn 0.5s ease;
                        }
                        
                        .error {
                            background-color: var(--error-bg);
                            border-left: 4px solid var(--error-color);
                            color: var(--error-color);
                        }
                        
                        button {
                            background-color: var(--accent-color);
                            color: white;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 4px;
                            cursor: pointer;
                            font-size: 16px;
                            margin-bottom: 20px;
                            font-family: inherit;
                            transition: background-color 0.2s ease, transform 0.2s ease;
                        }
                        
                        button:hover {
                            background-color: var(--accent-hover);
                            transform: translateY(-2px);
                        }
                        
                        button:active {
                            transform: translateY(1px);
                        }
                        
                        @keyframes fadeIn {
                            from { opacity: 0; transform: translateY(10px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                    </style>
                </head>
                <body>
                    <h1>${assignment.title} Preview</h1>
                    <button id="run-code">Run Code</button>
                    <h2>Code:</h2>
                    <pre><code>${escapeHtml(code)}</code></pre>
                    <div id="output" style="display: none;"></div>
                    
                    <script>
                        // Function to run the code
                        document.getElementById('run-code').addEventListener('click', function() {
                            const outputElement = document.getElementById('output');
                            outputElement.style.display = 'block';
                            outputElement.className = 'output';
                            outputElement.innerHTML = '<h2>Output:</h2>';
                            
                            try {
                                // Capture console.log
                                const originalConsoleLog = console.log;
                                const logs = [];
                                
                                console.log = function(...args) {
                                    logs.push(args.map(arg => {
                                        if (typeof arg === 'object') {
                                            return JSON.stringify(arg);
                                        }
                                        return String(arg);
                                    }).join(' '));
                                    originalConsoleLog.apply(console, args);
                                };
                                
                                // Run the code using Function constructor instead of eval
                                let result;
                                const executeFunction = new Function(${JSON.stringify(code)});
                                result = executeFunction();
                                
                                // Restore console.log
                                console.log = originalConsoleLog;
                                
                                // Display logs
                                if (logs.length > 0) {
                                    const logElement = document.createElement('div');
                                    logElement.innerHTML = '<h3>Console Output:</h3>';
                                    logs.forEach(log => {
                                        const logLine = document.createElement('p');
                                        logLine.textContent = log;
                                        logElement.appendChild(logLine);
                                    });
                                    outputElement.appendChild(logElement);
                                }
                                
                                // Display result if not undefined
                                if (result !== undefined) {
                                    const resultElement = document.createElement('div');
                                    resultElement.innerHTML = '<h3>Result:</h3>';
                                    
                                    const resultPara = document.createElement('p');
                                    if (typeof result === 'object') {
                                        resultPara.textContent = JSON.stringify(result, null, 2);
                                    } else {
                                        resultPara.textContent = result;
                                    }
                                    
                                    resultElement.appendChild(resultPara);
                                    outputElement.appendChild(resultElement);
                                }
                                
                                if (logs.length === 0 && result === undefined) {
                                    const noOutputElement = document.createElement('p');
                                    noOutputElement.textContent = 'Code executed with no output.';
                                    outputElement.appendChild(noOutputElement);
                                }
                            } catch (error) {
                                outputElement.className = 'output error';
                                outputElement.innerHTML = \`
                                    <h2>Error:</h2>
                                    <p>\${error.message}</p>
                                \`;
                            }
                        });
                    </script>
                </body>
                </html>
            `;
            
            previewWindow.document.open();
            previewWindow.document.write(htmlContent);
            previewWindow.document.close();
        })
        .catch(error => {
            console.error('Error creating preview page:', error);
            previewWindow.document.open();
            previewWindow.document.write(`
                <html>
                <head><title>Error</title></head>
                <body style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h1 style="color: #e53e3e;">Error loading preview</h1>
                    <p>${error.message}</p>
                    <button onclick="window.close()">Close Window</button>
                </body>
                </html>
            `);
            previewWindow.document.close();
        });
}

// Helper function to escape HTML
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}