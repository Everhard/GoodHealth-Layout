$(document).ready(function() {
    /*
     * Styled forms:
     */
    $(".catalogue-view select, .product-card .buy-row input, #cart-table .quantity input").styler();
    
    $(".catalogue-view .view button").click(function() {
       $(".catalogue-view .view button.selected").removeClass("selected");
       $(this).addClass("selected");  
       $(this).hasClass("list-mode") ? $(".products-list").addClass("list-view") : $(".products-list").removeClass("list-view");
    });
    
    /* Header buttons */
    $(".cabinet-enter-button").click(function() {
        $("[class^=modal-]:visible").hide();
        $(".modal-login").fadeIn(400);
        return false;
    });
    
    $(".remember-button").click(function() {
        $("[class^=modal-]:visible").hide();
         $(".modal-remember").show();
        return false;
    });
    
    $(".registration-button").click(function() {
        $("[class^=modal-]:visible").hide();
        $(".modal-registration").show();
        return false;
    });
    
    /* Modal close buttons */
    $("[class^=modal-] header .close").click(function() {
        $(this).parent().parent().fadeOut(400);
    });
    
    /*
     * Buy in one click:
     */
    $(".buy-in-one-click button").click(function() {
        alert("Спасибо за заказ! Курьер уже выехал!");
    });
    
    /*
     * Cabinet navigation:
     */
    $(".cabinet-menu a[data-section]").click(function() {
        var section = $(this).data("section");
        /*
         * Remove active classes:
         */
        $(".cabinet-section").removeClass('active');
        $(".cabinet-menu a[data-section]").removeClass('active');
        
        $(section).addClass("active");
        $(this).addClass("active");
        
        return false;
    });
    
    /*
     * Mobile menu:
     */
    $(".mobile-bar a").click(function() {
        var menu = $("body > header nav");
        if (!menu.hasClass('active') && !menu.hasClass('hiding')) {
            menu.css("top", $(".mobile-bar").offset().top + $(".mobile-bar").outerHeight() - $(window).scrollTop());
            menu.addClass("active");
        }
        return false;
    });
    
    $(document).mouseup(function (e) {
        var menu = $("body > header nav");
        if (menu.hasClass('active')) {
            if (menu.has(e.target).length === 0){
                menu.addClass("hiding");
                setTimeout(function() {
                    menu.removeAttr('style');
                    menu.removeClass("hiding");
                }, 300);
                menu.removeClass("active");
            }
        }
    });
    
    $(document).scroll(function() {
        var menu = $("body > header nav");
        if (menu.hasClass('active')) {
            setTimeout(function() {
                menu.removeAttr('style');
            }, 300);
            menu.removeClass("active");
        }
    });
    
    $("body > header nav").goodMenu();
});