$(document).ready(function() {
    $("#spinner").append("<img src='./mail/ajax-loader.gif'/>");
    $("#spinner").hide();

    /* My Email */
    $("#personal_email").text(" vern864@gmail.com");

    /* Quotes from famous people */
    var quote_array = [
        {   quote:  "'Real knowledge is to know the extent of one's ignorance.' ",
            person: " -Confucius"
        },
        {   quote:  "'It does not matter how slowly you go so long as you do not stop.' ",
            person: " -Confucius"
        },
        {   quote:  "'Whenever you find yourself on the side of the majority, it is time to pause and reflect.' ",
            person: " -Mark Twain"
        },
        {   quote:  "'I'm gonna make him an offer he can't refuse.' ",
            person: " -Vito Corleone"
        },
        {   quote:  "Most folks are about as happy as they make up their minds to be.' ",
            person: " -Lincoln"
        },
        {   quote:  "'Don't wait.  The time will never be just right.' ",
            person: " -Mark Twain"
        }
    ];

    var rndm_num = Math.floor(Math.random() * quote_array.length);
    $("#quote1").text(quote_array[rndm_num].quote);
    $("#person_quoted1").text(quote_array[rndm_num].person);
    quote_array.splice(rndm_num, 1);

    rndm_num = Math.floor(Math.random() * quote_array.length);
    $("#quote2").text(quote_array[rndm_num].quote);
    $("#person_quoted2").text(quote_array[rndm_num].person);
    quote_array.splice(rndm_num, 1);

    rndm_num = Math.floor(Math.random() * quote_array.length);
    $("#quote3").text(quote_array[rndm_num].quote);
    $("#person_quoted3").text(quote_array[rndm_num].person);
    quote_array.splice(rndm_num, 1);

    /* Scroll hire me button to contact page */
    $('.hire-me').click(function() {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500);
        return false;
    });

    /* For Bootstrap current state on portfolio sorting */
    $('ul.nav-pills li a').click(function(e) {
        $('ul.nav-pills li.active').removeClass('active')
        $(this).parent('li').addClass('active')
    });

    /* portfolio mixitup */
    $(window).load(function() {
        var $container = $('.grid-wrapper');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration:   750,
                easing:     'linear',
                queue:      false
            }
        });

        $('.grid-controls li a').click(function() {
            $('.grid-controls .current').removeClass('current');
            $(this).addClass('current');

            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter:             selector,
                animationOptions:   {
                                        duration:   750,
                                        easing:     'linear',
                                        queue:      false
                                    }
            });
            return false;
        });
    });

    /* Magnific Popup */
    $('.grid-wrapper').magnificPopup({
        delegate:   'a',
        type:       'image',
        gallery:    {
                        enabled: true
                    }
    });

    /* Sticky menu */
    $(".navbar").sticky({
        topSpacing: 0
    });

    /* Scroll spy and scroll filter */
    $('#main-menu').onePageNav({
        currentClass:       "active",
        changeHash:         false,
        scrollThreshold:    0.5,
        scrollSpeed:        750,
        filter:             "",
        easing:             "swing"
    });

    /* Charts*/
    $('.chart').waypoint(function() {
        $(this).easyPieChart({
            barColor:   '#3498db',
            size:       '150',
            easing:     'easeOutBounce',
            onStep:     function(from, to, percent) {
                            $(this.el).find('.percent').text(Math.round(percent));
                        }
        });
    }, {
        triggerOnce: true,
        offset: 'bottom-in-view'
    });

    /* VEGAS Home Slider */
    $('#page-welcome').vegas({
    slides: [
                { src: 'img/slider/IMG_9096.jpg' },
                { src: 'img/slider/20161030_120811.jpg' },
                { src: 'img/slider/20161029_144458.jpg' },
                { src: 'img/slider/IMG_9027.jpg' }
            ],
    overlay: true
    });

    $("#vegas-next").click(function() {
        $('#page-welcome').vegas('next');
    });

    $("#vegas-prev").click(function() {
       $('#page-welcome').vegas('previous');
    });

});
