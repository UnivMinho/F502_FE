    $(document).ready(function() {
        $('#toggleButton').on('click', function() {
            $('.mini_banner').toggleClass('minimized');
            var isMinimized = $('.mini_banner').hasClass('minimized');
            if (isMinimized) {
                $('.arrow').html('&#x25B6;'); // Change to right arrow
            } else {
                $('.arrow').html('&#x25C0;'); // Change to left arrow
            }
        });
    });
