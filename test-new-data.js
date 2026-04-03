import http from 'http';

console.log('Testing APIs with New Data...\n');

// Test 1: Get careers
const opts1 = {hostname: 'localhost', port: 3001, path: '/api/careers?limit=1', method: 'GET'};
const req1 = http.request(opts1, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('✅ Careers API:');
      console.log('   Total: ' + json.pagination.total + ' careers');
      console.log('   Sample: ' + json.careers[0].title);
    } catch(e) {
      console.log('Error: ' + e.message);
    }
  });
});
req1.on('error', e => console.log('Error: ' + e.message));
req1.end();

// Test 2: Get courses
setTimeout(() => {
  const opts2 = {hostname: 'localhost', port: 3001, path: '/api/courses?limit=2', method: 'GET'};
  const req2 = http.request(opts2, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        console.log('\n✅ Courses API:');
        console.log('   Total: ' + json.total + ' courses');
        console.log('   Returned: ' + (json.data ? json.data.length : 0) + ' courses');
        if (json.data && json.data[0]) {
          console.log('   Sample: ' + json.data[0].title);
        }
      } catch(e) {
        console.log('Error: ' + e.message);
      }
    });
  });
  req2.on('error', e => console.log('Error: ' + e.message));
  req2.end();
}, 1000);

// Test 3: Search careers
setTimeout(() => {
  const opts3 = {hostname: 'localhost', port: 3001, path: '/api/careers/search/engineer', method: 'GET'};
  const req3 = http.request(opts3, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        console.log('\n✅ Search API - Search for engineer:');
        console.log('   Found: ' + json.count + ' results');
        if (json.results && json.results.length > 0) {
          json.results.slice(0, 3).forEach(r => console.log('   - ' + r.title));
        }
      } catch(e) {
        console.log('Error: ' + e.message);
      }
    });
  });
  req3.on('error', e => console.log('Error: ' + e.message));
  req3.end();
}, 2000);

// Test 4: Get career with roadmap
setTimeout(() => {
  const opts4 = {hostname: 'localhost', port: 3001, path: '/api/careers/ind11', method: 'GET'};
  const req4 = http.request(opts4, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        console.log('\n✅ Career Detail API - Doctor (ind11):');
        console.log('   Title: ' + json.title);
        console.log('   Salary: ' + json.salary);
        console.log('   Roadmap stages: ' + (json.steps ? json.steps.length : 0));
        console.log('\n✅ All tests completed!');
      } catch(e) {
        console.log('Error: ' + e.message);
      }
    });
  });
  req4.on('error', e => console.log('Error: ' + e.message));
  req4.end();
}, 3000);
