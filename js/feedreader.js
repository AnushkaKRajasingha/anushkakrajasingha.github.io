function feadreader(url){
    const RSS_URL = `https://www.billerickson.net/code/feed/`;
    url = url == undefined ? RSS_URL : url;
    $.ajax(url, {
        accepts: {
            xml: "application/rss+xml"
        },
        headers:{},
        crossDomain: true,
        dataType: "xml",

        success: function(data) {
            $(data)
                .find("item")
                .each(function() {
                    const el = $(this);

                    const template = `
          <article>
            <img src="${el.find("link").text()}/image/large.png" alt="">
            <h2>
              <a href="${el
                        .find("link")
                        .text()}" target="_blank" rel="noopener">
                ${el.find("title").text()}
              </a>
            </h2>
          </article>
        `;

                    document.body.insertAdjacentHTML("beforeend", template);
                });
        }
    });

}