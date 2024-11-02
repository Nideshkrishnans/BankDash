// Load data from data.json
fetch('data.json')
    .then(res => res.json())
    .then(data => {
        const users = data.users;
        renderUsers(users);
        let sortOrder = "asc";

        // Filter users by name
        const searchInput = document.getElementById('search');
        searchInput.addEventListener('input', () => {
            const searchValue = searchInput.value.toLowerCase();
            const filteredUsers = users.filter(user =>
                user.fullName.toLowerCase().includes(searchValue)
            );
            renderUsers(filteredUsers);
        });

        // Sort users by join date
        const sortButton = document.getElementById('sort-button');
        sortButton.addEventListener('click', () => {
            const sortedUsers = [...users].sort((a, b) =>{
                 return sortOrder === "asc" ? new Date(a.joinDate) - new Date(b.joinDate) : new Date(b.joinDate) - new Date(a.joinDate);
            });
            sortOrder = sortOrder === "asc" ? "desc" : "asc";
            renderUsers(sortedUsers);
        });
    });

function renderUsers(users) {
    console.log(users);
    
    const userGrid = document.getElementById('user-grid');
    userGrid.innerHTML = '';

    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'col-md-4 d-flex justify-content-center align-items-center mt-3 mt-md-5';
        
        userCard.innerHTML = `
            
                  <div class="card ms-3 ms-md-0" style="width: 92%;">
                    <div class=" d-flex justify-content-center justify-content-md-around align-items-center">
                      <img class="profile-pic me-3 me-md-0" src="./images/${user.profilePic}" alt="">
                      <div>
                        <h5 class="fw-bold pt-3">${user.fullName}</h5>
                        <h6 class="spfont">${user.age}/${user.gender}</h6>
                      </div>
                    </div>
                    <div class="card-body">
                      <h6 class="spfont"><span class="fw-bold me-2" >Occupation:</span>${user.occupation}</h6>
                      <h6 class="spfont"><span class="fw-bold me-4">Location:</span>${user.location}</h6>
                      <p class="card-text" style="font-size: smaller;">${user.description}</p>
                      <h5 class="usertraits fw-bold">User traits</h5>
                      <div class="row">
                      ${user.traits.map(trait => `<div class="traits col-3 col-md-4 rounded-5 text-center mt-1" style="font-size: x-small;">${trait}</div>`).join('')}
                      </div>
                    </div>
                  </div>
                
        `;

        userGrid.appendChild(userCard);
    });
}