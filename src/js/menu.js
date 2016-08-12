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
            if (goodMenu.width() > 767 && goodMenu.width() < navMenuWidth) {

                var widthSearch = navMenuWidth;

                for (i = itemsWidth.length - 1; i > 0; i--) {

                    widthSearch -= itemsWidth[i];

                    if (goodMenu.width() > widthSearch) {
                        if (currentHideIndex !== i) {

                            if (goodMenu.find(".additional-menu-button").length === 0)  {
                                goodMenu.append("<a href='#' class='additional-menu-button'></a>");
                                navMenuWidth += 45; // More button
                            }

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
                navMenuWidth -= 45; // More button
            }
        };

        $(window).resize(update);
        
        // First time start:
        update();

        goodMenu.on("click", ".additional-menu-button", function() {
            var wrapper = goodMenu.find(".wrapper");
            wrapper.css("top", 220 - $(window).scrollTop()).toggle();
            return false;
        });
        
        $(document).mouseup(function (e) {
            var container = goodMenu.find(".wrapper");
            if (container.has(e.target).length === 0){
                container.fadeOut(300);
            }
        });
        
        $(document).scroll(function() {
           var container = goodMenu.find(".wrapper");
           container.fadeOut(300);
        });

    }
})(jQuery);