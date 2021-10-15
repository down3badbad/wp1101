let a = document.getElementById("a"),
    b = document.getElementById("b"),
    c = document.getElementById("c"),
    d = document.getElementById("d"),
    e = document.getElementById("e"),
    f = document.getElementById("f"),
    g = document.getElementById("g"),
    h = document.getElementById("h"),
    i = document.getElementById("i"),
    s = document.getElementById("s");

let chosenphoto = "a";
a.classList.add("chosen");

function tomeme(){
    let y = document.getElementById(chosenphoto);
    y.classList.remove("chosen");
    chosenphoto = "a";
    a.src = "https://cdn.vox-cdn.com/thumbor/cV8X8BZ-aGs8pv3D-sCMr5fQZyI=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/19933026/image.png";
    b.src = "https://cdn2.hubspot.net/hubfs/53/how-to-make-a-meme.jpg";
    c.src = "https://media-assets-03.thedrum.com/cache/images/thedrum-prod/s3-news-tmp-349138-meme7--default--1050.png"
    d.src = "https://travel.ulifestyle.com.hk/cms/news_photo/original/20210505190728___118283916_b19c5a1f-162b-410b-8169-f58f0d153752.jpg";
    e.src = "https://images.theconversation.com/files/38926/original/5cwx89t4-1389586191.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip";
    f.src = "https://www.adweek.com/wp-content/uploads/2020/04/AI-Meme-PAGE-2020.jpg";
    g.src = "https://cdn.vox-cdn.com/thumbor/3MyX_yQsQFv8YK7K1kx_R3Vc490=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/13315879/npcmeme.jpg";
    h.src = "https://ichef.bbci.co.uk/news/1024/branded_news/16DA6/production/_120660639_thumbnail_chloesideeye_clean.jpg";
    i.src = "https://e3.365dm.com/19/09/2048x1152/skynews-drew-scanlon-blinking-white-guy_4786055.jpg";
    s.src = "https://e3.365dm.com/19/09/2048x1152/skynews-drew-scanlon-blinking-white-guy_4786055.jpg";
    a.classList.add("chosen");
}

function topoke(){
    let y = document.getElementById(chosenphoto);
    y.classList.remove("chosen");
    chosenphoto = "a";
    a.src = "https://dynaimage.cdn.cnn.com/cnn/q_auto,w_380,c_fit/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F210226040722-01-pokemon-anniversary-design.jpg";
    b.src = "https://static.wikia.nocookie.net/sonicpokemon/images/b/bf/Charizard_AG_anime.png/revision/latest?cb=20130714192025";
    c.src = "https://lh3.googleusercontent.com/proxy/ddyvZyorSV7Rg-NOt0d5fxZY_8W-FTH2uR_rgXZIHpHPy4P1eM0m7LSAOazjS1MmgQQiGh2BkdkrkljjM9ftydVGhhU6ufYPpmv3tYAZgShj";
    d.src = "https://media.izi.travel/4e9d2b2c-83c3-4a84-8675-7cc276270305/b478677b-739c-477a-984a-b1f80f262f2a_800x600.jpg";
    e.src = "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fdavidthier%2Ffiles%2F2018%2F02%2F800px-Rayquaza_M07.jpg";
    f.src = "https://www.seekpng.com/png/detail/19-191543_pokemon-eevee-png-svg-library-stock-evee-png.png";
    g.src = "https://cdn.cnn.com/cnnnext/dam/assets/210226041421-02-pokemon-anniversary-design-full-169.jpg";
    h.src = "https://i.pinimg.com/736x/09/c6/00/09c60047f93ea89e190d73ae8c9049c9.jpg"; 
    i.src = "https://www.seekpng.com/png/detail/189-1890303_blaziken-blaziken-pokemon.png";
    s.src = "https://dynaimage.cdn.cnn.com/cnn/q_auto,w_380,c_fit/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F210226040722-01-pokemon-anniversary-design.jpg";
    a.classList.add("chosen");
}

function toempty(){
    alert("This is an empty album!");
}

function changephoto(id){
    //Change css effect
    let x = document.getElementById(id);
    x.classList.add("chosen");
    let y = document.getElementById(chosenphoto);
    y.classList.remove("chosen");
    chosenphoto = x.id;

    let s = document.getElementById("s");
    s.src = x.src;
}
