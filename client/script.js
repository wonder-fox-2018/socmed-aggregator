$(document).ready(function () {
    loadUserList()
    loadRepo('franshiro')
    searchRepo()
});

userList = [
    {
        name: 'frans',
        username: 'franshiro'
    },
    {
        name: 'gusti',
        username: 'gandryeanb'
    },
    {
        name : 'dimas',
        username : 'kunglaw'
    }
]

function loadUserList () {

    userList.forEach(user => {
        $('#userlist').append(`
            <li>
            <a href=# onclick="loadRepo('${user.username}')">${user.name}</a>
            </li>
        `)
    });
}

function repoDescription(username, repoName, avatar, deskripsi, star){
    $(`#repo-deskrip`).empty()
    $(`#repo-deskrip`).append(`
        <img src="${avatar}" width = "100">
        <h1>${repoName}</h1>
        <p>Username : ${username}</p>
        <p>Deskription : ${deskripsi}</p>
        <p>Star : ${star}</p>
    `)
}

function loadRepo (username) {
    $.ajax({
        method: "GET",
        url: `http://localhost:3000/repo/${username}`,
        headers : {
            token : localStorage.getItem('token')
        }
       })
       .done(function(data) {
           $(`#repo-list`).empty()
           
           data.forEach(list => {
               $(`#repo-list`).append(`
               <table id='table'>
                    <tr>
                        <td>
                            <h1><a href=# onclick="repoDescription('${list.owner.login}', '${list.name}', '${list.owner.avatar_url}', '${list.description}', '${list.stargazers_count}')">${list.name}</a></h1>
                        </td>
                    </tr>
                </table>
               `)
           })
       })
       .fail(function(err) {
           alert( "error");
       })
}

function searchRepo(){
      $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#table tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token
    $.ajax({
        method: "POST",
        url: `http://localhost:3000/signin/google`,
        data : { googleToken : id_token}
    })
    .done(function(data) {
        console.log(data)
        localStorage.setItem('token', data.token)

        let isTokenExist = localStorage.getItem('token')
        if(isTokenExist){
            $('#formCreateRepo').show()
        }
    })
    .fail(function(err) {
        // alert( "error");
        console.log(err)
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        console.log('User signed out.');
        localStorage.removeItem('token')

        let isTokenExist = localStorage.getItem('token')
        if(!isTokenExist){
            $('#formCreateRepo').hide()
        }
    });
}





