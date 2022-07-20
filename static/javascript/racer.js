let racerSearchForm = document.getElementById('racerSearch')

racerSearchForm.addEventListener('submit', (event) => {
    event.preventDefault()

    let formData = new FormData(racerSearchForm)
    let seasonInput = formData.get('seasonInput')
    let roundInput = formData.get('roundInput')

    fetch(`https://ergast.com/api/f1/${seasonInput}/${roundInput}/driverStandings.json`)
        .then((res) => res.json())
        .then((data) => displaySearchResult(data))
})

function displaySearchResult(seasonRound) {
    let featuredSeasonRoundEl = document.getElementById('featuredSeasonRound')
    console.log(seasonRound)

    if (Object.values(seasonRound).length == 0) {
        featuredSeasonRoundEl.innerHTML = '<p>The information was not available.  Try again.</p>'
        return
    }

    let rowHTML = `
    
    `

    for (let i=0; i<10; i++) {
        rowHTML += `
            <tr>
                <th scope="row">${seasonRound['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings'][i]['position']}</th>
                <td>${seasonRound['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings'][i]['Driver']['givenName']} ${seasonRound['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings'][i]['Driver']['familyName']}</td>
                <td>${seasonRound['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings'][i]['Driver']['nationality']}</td>
                <td>${seasonRound['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings'][i]['Constructors'][0]['name']}</td>
                <td>${seasonRound['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings'][i]['points']}</td>
            </tr>
        `
    }


    let seasonRoundHTML = `
       ${rowHTML}
    `
    featuredSeasonRoundEl.innerHTML = seasonRoundHTML

}


