class Anime{
    constructor(name) {
        this.name = name;
    }
}



class AnimeService{
    
    static url = "https://63dc7a7ec45e08a0435aa593.mockapi.io/Week12/Anime";


    static getAllAnimes() {
        return $.get(this.url);
    }


    static getAnime (id) {
        return $.get(this.url + `/${id}`);
    }

    static createAnime(anime) {
        return $.post(this.url, anime);
    }


    static updateAnime(anime){
        return $.ajax({
            url: this.url + `/${anime._id}`,
            dataType: 'json',
            data: JSON.stringify(anime),
            contentType: 'application/json',
            type: 'PUT'
        });
    }
//   static deleteAnime(id) {
//          return $.delete(this.url + `/${id}`);
//         }
     

    static deleteAnime(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        });
    }
}


class DOMManager {
    static animes;


    static getAllAnimes() {
        AnimeService.getAllAnimes().then(animes => this.render(animes));
    }



    static createAnime(name) {
        AnimeService.createAnime(new Anime(name))
            .then(() => {
                return AnimeService.getAllAnimes();
            })
            .then((animes) => this.render(animes));
    }


    static deleteAnime(id) {
        AnimeService.deleteAnime(id)
        .then(() => {
            return AnimeService.getAllAnimes();
        })
        .then((animes) => this.render(animes));
    }



    static render(animes){ 
        $('#app').empty();
        for (let anime of animes) {
            $('#app').prepend(
                `<div id = "${anime._id}" class="card">
                    <div class ="card-header">
                    <h2>${anime.name}</h2>
                    <button class = "btn btn-danger" onclick="DOMManager.deleteAnime('${anime._id}')">Delete</button>
                    </div>
                </div>
             <br> `
          );
    


          }
        }
     }



$('#create-new-anime').click(() => {
    DOMManager.createAnime($('#new-anime-name').val());
    $('#new-anime-name').val('');
});




DOMManager.getAllAnimes();










