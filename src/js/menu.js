/*
 * GoodMenu jQuery Plugin
 */

(function($) {
    $.fn.goodMenu = function() {
        
        var goodMenu = this;
        
        /*
         * Menu width:
         */ 
        var navMenuWidth = 0;
        var additionalMenuButtonWidth = 0;
        var navMenuMinWidth = 767;
        
        var properties = [
            "width",
            "padding-left",
            "padding-right",
            "margin-left",
            "margin-right",
            "border-left-width",
            "border-right-width"
        ];

        var itemsWidth = [];

        goodMenu.children("a").each(function() {

            var itemWidth = 0;

            for (i = 0; i < properties.length; i++) {
                itemWidth += parseInt($(this).css(properties[i]));
            }

            itemsWidth.push(itemWidth);

            navMenuWidth += itemWidth;
        });

        var currentHideIndex = 0;
        
        var update = function() {

            if (goodMenu.width() > navMenuMinWidth && goodMenu.width() < navMenuWidth) {
                
                if (goodMenu.find(".additional-menu-button").length === 0)  {
                    goodMenu.append("<a href='#' class='additional-menu-button'></a>");
                    additionalMenuButtonWidth = goodMenu.find(".additional-menu-button").innerWidth();
                }

                var widthSearch = navMenuWidth;

                for (i = itemsWidth.length - 1; i > 0; i--) {

                    widthSearch -= itemsWidth[i];

                    if (goodMenu.width() > widthSearch + additionalMenuButtonWidth) {
                        if (currentHideIndex !== i) {


                            goodMenu.find(".wrapper a").unwrap();
                            goodMenu.find("a:nth-child(" + i + ") ~ a[class!=additional-menu-button]").wrapAll("<div class='wrapper' />");
                            currentHideIndex = i;
                        }
                        break;
                    }
                }
            }
            else if (goodMenu.find(".wrapper").length > 0) {
                currentHideIndex = 0;
                goodMenu.find(".wrapper a").unwrap();
                goodMenu.find(".additional-menu-button").remove();
            }
        };

        $(window).resize(update);
        
        // First time start:
        update();

        /*
         * Additional dynamic menu toggle:
         */
        goodMenu.on("click", ".additional-menu-button", function(e) {
            
            e.preventDefault();
            
            var headerH = $("#js-header").height();
            var menuH = $("#js-nav").height();
            var documentScroll = $(document).scrollTop();
            var additionalMenuTop;
            
            if (documentScroll < headerH - menuH) {
                    additionalMenuTop = headerH - documentScroll;
            } else {
                additionalMenuTop = menuH;
            }
            
            var wrapper = goodMenu.find(".wrapper");
            wrapper.css({
                "top"  : additionalMenuTop + 10
            }).toggle();
        });
        
        $(document).mouseup(function (e) {
            var container = goodMenu.find(".wrapper");
            if (container.has(e.target).length === 0){
                container.fadeOut(300);
            }
        });
        
        /*
         * Hide menu when scroll:
         */
        $(document).on("scroll", function() {
           var container = goodMenu.find(".wrapper");
           container.fadeOut(300);
        });

    }
})(jQuery);