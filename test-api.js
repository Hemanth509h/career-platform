import http from 'http';

console.log('🧪 Testing Enhanced Career APIs...\n');

// Test 1: Search endpoint
console.log('[Test 1: Search for "design"]');
const options1 = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/careers/search/design',
  method: 'GET'
};

const req1 = http.request(options1, res => {
  let resp = '';
  res.on('data', chunk => resp += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(resp);
      console.log('✅ Found ' + json.count + ' results');
      if (json.results && json.results.length > 0) {
        json.results.slice(0, 3).forEach(c => console.log('  - ' + c.title));
      }
    } catch(e) {
      console.log('❌ Error: ' + e.message);
    }
    console.log('');
    
    // Test 2: Related careers
    setTimeout(() => {
      console.log('[Test 2: Related careers to Data Scientist (ind02)]');
      const options2 = {
        hostname: 'localhost',
        port: 3001,
        path: '/api/careers/ind02/related',
        method: 'GET'
      };
      
      const req2 = http.request(options2, res => {
        let resp = '';
        res.on('data', chunk => resp += chunk);
        res.on('end', () => {
          try {
            const json = JSON.parse(resp);
            console.log('✅ Found ' + json.relatedCareers.length + ' related careers');
            if (json.relatedCareers && json.relatedCareers.length > 0) {
              json.relatedCareers.slice(0, 3).forEach(c => {
                console.log('  - ' + c.title + ' (Similarity: ' + c.similarity + ')');
              });
            }
          } catch(e) {
            console.log('❌ Error: ' + e.message);
          }
          console.log('');
          
          // Test 3: Chat with enhanced responses
          setTimeout(() => {
            console.log('[Test 3: AI Chat - Tech Career Query]');
            const chatData = JSON.stringify({
              messages: 'What tech careers are best for me?',
              userProfile: {
                name: 'Test User',
                profile: {
                  personality: 'Analytical Thinker',
                  analyticalScore: 85,
                  creativeScore: 60,
                  socialScore: 70,
                  technicalScore: 90,
                  leadershipScore: 65
                }
              }
            });
            
            const options3 = {
              hostname: 'localhost',
              port: 3001,
              path: '/api/chat',
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Content-Length': chatData.length
              }
            };
            
            const req3 = http.request(options3, res => {
              let resp = '';
              res.on('data', chunk => resp += chunk);
              res.on('end', () => {
                try {
                  const json = JSON.parse(resp);
                  const hasChart = json.response.includes('![') && json.response.includes('quickchart');
                  console.log('✅ Chat Response received' + (hasChart ? ' (with chart)' : ''));
                  console.log('Response: ' + json.response.substring(0, 100) + '...');
                } catch(e) {
                  console.log('❌ Error: ' + e.message);
                }
                console.log('\n✅ All tests completed!');
              });
            });
            
            req3.on('error', e => console.log('❌ Error: ' + e.message));
            req3.write(chatData);
            req3.end();
          }, 800);
        });
      });
      
      req2.on('error', e => console.log('❌ Error: ' + e.message));
      req2.end();
    }, 800);
  });
});

req1.on('error', e => console.log('❌ Error: ' + e.message));
req1.end();
