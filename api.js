
export async function signup(username, password, role) {
  const response = await fetch('http://localhost:3000/users/signup', {
    method: 'POST',
    credentials: 'include',    
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password, role })
  });

  return await response.json();   
}

export async function login(username, password, role) {
  const response = await fetch('http://localhost:3000/users/login', {
    method: 'POST',
    //credentials: 'include',    
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password, role })
  });

  return await response.json();   
}

const result = await login('moshe', '123456', 'user');
console.log(result);  


