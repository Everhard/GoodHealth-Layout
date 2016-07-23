$(document).ready(function() {
    
    /*
     * Navigation menu width:
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
    
    var currentHideIndex = 0;
    
    $("body > header nav a").each(function() {
        
        var itemWidth = 0;
        
        for (i = 0; i < properties.length; i++) {
            itemWidth += parseInt($(this).css(properties[i]));
        }
        
        itemsWidth.push(itemWidth);
        
        navMenuWidth += itemWidth;
    });
    
    console.log("start " + navMenuWidth);
    console.log(itemsWidth);
    
    $(window).resize(function() {
        if ($(this).width() < navMenuWidth) {
            
            var widthSearch = navMenuWidth;
            
            for (i = itemsWidth.length - 1; i > 0; i--) {
                
                widthSearch -= itemsWidth[i];
                        
                if ($(this).width() > widthSearch) {
                    if (currentHideIndex !== i) {
                        console.log("It's " + i);
                        
                        if ($("body > header nav .additional-menu-button").length === 0)  {
                            $("body > header nav").append("<a href='#' class='additional-menu-button'></a>");
                            navMenuWidth += 31; // More button
                        }
                        
                        $("body > header nav .wrapper a").unwrap();
                        $("body > header nav a:nth-child(" + i + ") ~ a[class!=additional-menu-button]").wrapAll("<div class='wrapper' />");
                        currentHideIndex = i;
                    }
                    break;
                }
            }
        }
        else if ($("body > header nav .wrapper").length > 0) {
            currentHideIndex = 0;
            $("body > header nav .wrapper a").unwrap();
            $("body > header nav .additional-menu-button").remove();
            navMenuWidth -= 31; // More button
        }
    });
    
    $("body > header nav").on("click", ".additional-menu-button", function() {
        $("body > header nav .wrapper").toggle();
    });
    
    $(".catalogue-view select").styler();
    
    $(".catalogue-view .view button").click(function() {
       $(".catalogue-view .view button.selected").removeClass("selected");
       $(this).addClass("selected");  
       $(this).hasClass("list-mode") ? $(".products-list").addClass("list-view") : $(".products-list").removeClass("list-view");
    });
});