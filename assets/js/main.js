(function ($) {
    "use strict";
    jQuery(window).on('load', function () {
        setTimeout(function() {
            jQuery("#status").fadeOut(); // Fade out the status div
            jQuery("#preloader").delay(350).fadeOut("slow"); // Fade out the preloader after a delay
        }, 5000); // 5-second delay
    });
    jQuery('.mobile-menu nav').meanmenu({ meanScreenWidth: "768", });
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 700) {
            $('#sticky').addClass('sticky');
        } else { $('#sticky').removeClass('sticky'); }
    });
    $('.menu_scroll ul li a').on('click', function (e) {
        $('.menu_scroll ul li').removeClass('active');
        $(this).parent().addClass('active');
        var target = $('[section-scroll=' + $(this).attr('href') + ']');
        e.preventDefault();
        var targetHeight = target.offset().top - parseInt('0');
        $('html, body').animate({ scrollTop: targetHeight }, 1000);
    });
    $(window).scroll(function () {
        var windscroll = $(window).scrollTop();
        var target = $('.menu_scroll ul li');
        if (windscroll >= 0) {
            $('[section-scroll]').each(function (i) {
                if ($(this).position().top <= windscroll + 95) {
                    target.removeClass('active');
                    target.eq(i).addClass('active');
                }
            });
        } else {
            target.removeClass('active');
            $('.menu_scroll ul li:first').addClass('active');
        }
    });
    new WOW().init();
    $(".testimonial-slider").owlCarousel({
        autoPlay: true,
        slideSpeed: 2000,
        pagination: false,
        navigation: false,
        items: 1,
        navigationText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"], itemsDesktop: [1199, 1], itemsDesktopSmall: [992, 1], itemsTablet: [768, 1], itemsMobile: [480, 1],
    });
    $(".gallery-slider").owlCarousel({
        autoPlay: true,
        slideSpeed: 2000,
        pagination: true,
        navigation: false,
        items: 3,
        navigationText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"], itemsDesktop: [1199, 3], itemsDesktopSmall: [992, 2], itemsTablet: [768, 1], itemsMobile: [480, 1],
    });
    $(".gift-slider").owlCarousel({
        autoPlay: true,
        slideSpeed: 2000,
        pagination: true,
        navigation: false,
        items: 3,
        navigationText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"], itemsDesktop: [1199, 3], itemsDesktopSmall: [992, 3], itemsTablet: [768, 2], itemsMobile: [480, 1],
    });
    $(".familyslider").owlCarousel({
        autoPlay: true,
        slideSpeed: 2000,
        pagination: false,
        navigation: true,
        items: 4,
        navigationText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"], itemsDesktop: [1199, 4], itemsDesktopSmall: [992, 3], itemsTablet: [768, 2], itemsMobile: [480, 1],
    });
    $('.jarallax').jarallax({ speed: 0.5 });
    $('.gallery-slider').magnificPopup({
        delegate: 'a', type: 'image', closeOnContentClick: false, closeBtnInside: false, mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true,
            titleSrc: function (item) {
                return item.el.attr('title') + ' &middot; <a class="image-source-link" href="' + item.el.attr('data-source') + '" target="_blank">image source</a>';
            }
        }, gallery: { enabled: true }, zoom: {
            enabled: true, duration: 300, opener: function (element) {
                return element.find('img');
            }
        }
    });


    function e() {
        var e = new Date('10/05/2024');
        // e.setDate('6/28/2023');
        var dd = e.getDate();
        var mm = e.getMonth() + 1;
        var y = e.getFullYear();
        var futureFormattedDate = mm + "/" + dd + "/" + y + ' 8:00:00';
        return futureFormattedDate;
    }
    $('.counter-lists').downCount({
        date: e(),
        offset: 16
    });


    $('.sliders').bxSlider({
        mode: 'fade',
        speed: 2000,
        auto: true
    });


    $.scrollUp({ scrollText: '<i class="fas fa-arrow-up"></i>', easingType: 'linear', scrollSpeed: 900, animation: 'fade' });


    function checkRequire(formId, targetResp) {
        targetResp.html('');
        var email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
        var url = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
        var image = /\.(jpe?g|gif|png|PNG|JPE?G)$/;
        var mobile = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
        var facebook = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
        var twitter = /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9(\.\?)?]/;
        var google_plus = /^(https?:\/\/)?(www\.)?plus.google.com\/[a-zA-Z0-9(\.\?)?]/;
        var check = 0; $('#er_msg').remove();
        var target = (typeof formId == 'object') ? $(formId) : $('#' + formId);
        target.find('input , textarea , select').each(function () {
            if ($(this).hasClass('require')) {
                if ($(this).val().trim() == '') {
                    check = 1; $(this).focus();
                    targetResp.html('You missed out some fields.');
                    $(this).addClass('error'); return false;
                } else {
                    $(this).removeClass('error');
                }
            }
            if ($(this).val().trim() != '') {
                var valid = $(this).attr('data-valid');
                if (typeof valid != 'undefined') {
                    if (!eval(valid).test($(this).val().trim())) {
                        $(this).addClass('error');
                        $(this).focus();
                        check = 1;
                        targetResp.html($(this).attr('data-error'));
                        return false;
                    } else {
                        $(this).removeClass('error');
                    }
                }
            }
        }); return check;
    }



    $(".submitForm").on("click", function () {
        var _this = $(this);
        var targetForm = _this.closest('form');
        var errroTarget = targetForm.find('.response');
        var check = checkRequire(targetForm, errroTarget);
        if (check == 0) {
            var formDetail = new FormData(targetForm[0]);
            formDetail.append('form_type', _this.attr('form-type'));
            $.ajax({
                method: 'post',
                url: 'ajax.php',
                data: formDetail,
                cache: false,
                contentType: false,
                processData: false
            }).done(function (resp) {
                if (resp == 1) {
                    targetForm.find('input').val('');
                    targetForm.find('textarea').val('');
                    errroTarget.html('<p style="color:green;">Mail has been sent successfully.</p>');
                } else {
                    errroTarget.html('<p style="color:red;">Something went wrong please try again latter.</p>');
                }
            });
        }
    });


})(jQuery);