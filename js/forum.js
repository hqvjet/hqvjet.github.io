let typeAmount = [];



let currentPage, contentAmount = 12, pageAmount = 0, currentType;

//function for counting contents of each club
$(document).ready(() => {
    //push data from local storage

    //
    const topics = JSON.parse(`[
        {"username":"Hoang Quoc Viet","type":"Guitar","topic":"Tư vấn guitar trong tầm 5tr - 10tr","content":"qwe"},
        {"username":"Hoang Manh cuong","type":"Karate","topic":"Tổ chức trận đấu tập","content":"qwe"},
        {"username":"Hoang Nam","type":"Đọc sách","topic":"Cách để trở thành người tri thức","content":"qwe"},
        {"username":"Hoang Diep","type":"Nhảy","topic":"Cách nhảy Hip-Hop","content":"qwe"},
        {"username":"Nguyen Thi Nguyen","type":"Bóng chuyền","topic":"Chia sẻ kiến thức thi đấu","content":"qwe"},
        {"username":"Nguyen Thi Thuy","type":"Cầu lông","topic":"Cách để đánh cầu lông một cách chuyên nghiệp","content":"qwe"},
        {"username":"Hoang Thien Phu","type":"Bóng đá","topic":"Chia sẻ địa điểm sân bóng đá tốt và rẻ","content":"qwe"},
        {"username":"Nguyen Thi Kim ngan","type":"Esport","topic":"Thông báo đợt tuyển thành viên CLB ESPORT","content":"qwe"},
        {"username":"Nguyen Hoa Vuong","type":"Kĩ năng","topic":"Vì sao chúng ta ngại trước đám đông ?","content":"qwe"},
        {"username":"Tran Bao Linh","type":"Kĩ năng","topic":"Làm chủ kĩ năng sáng tạo","content":"qwe"},
        {"username":"Nguyen Phuong Thao","type":"Guitar","topic":"Tổ chức lengend guitar university","content":"qwe"},
        {"username":"Nguyen Phuong Nga","type":"Cầu lông","topic":"Tuyển thành viên CLB cầu lông","content":"qwe"}
    ]`);

    localStorage.setItem("data", JSON.stringify(topics));

        // 'asdfsd' + i + 'adsf' => `asfdsf${i}asfasd`
        // topics.push(
        //     {
        //         username: 'asdfsdf',
        //         type: 'adfssfd',
        //         topic: 'asdfsadfasdf',
        //     },
        //     {
        //         username: 'asdfsdf',
        //         type: 'adfssfd',
        //         topic: 'asdfsadfasdf',
        //     }
        // )

    $.fn.increaseTypeAmount = (type) => {
        if (type == "Cầu lông")
            ++typeAmount[0];
        else if (type == "Guitar")
            ++typeAmount[1];
        else if (type == "Bóng đá")
            ++typeAmount[2];
        else if (type == "Đọc sách")
            ++typeAmount[3];
        else if (type == "Nhảy")
            ++typeAmount[4];
        else if (type == "Bóng chuyền")
            ++typeAmount[5];
        else if (type == "Esport")
            ++typeAmount[6];
        else if (type == "Kỹ năng")
            ++typeAmount[7];
        else if (type == "Mã nguồn mở")
            ++typeAmount[8];
        else if (type == "Lập trình")
            ++typeAmount[9];
        else if (type == "Bơi lội")
            ++typeAmount[10];
        else if (type == "Hand in hand")
            ++typeAmount[11];
    }
    //init typeAmount
    for (let i = 0; i < contentAmount; ++i) 
        typeAmount[i] = 0;

    for (let i = 0; i < contentAmount; ++i)
        $.fn.increaseTypeAmount(topics[i].type);


    //function for executing all club type


    $.fn.getPaginationItem = (contentAmount) => {
        let contentA = contentAmount;
        $("#pagination").append("<li id=\"previous\" class=\"pag-item\"><i class=\"fa-solid fa-chevron-left\"></i></li>");
        $("#previous").addClass("pag-item");
        $("#previous").addClass("disable");
        $("#previous").on("click", () => {
            $.fn.loadContent(currentType, currentPage - 2);
        });

        $("#next").on("click", () => {
            $.fn.page(currentType, currentPage);
        })
        let pageIndex = 0;
        const handlePage = (pageIndex) => () => {
            $.fn.handlePagination(pageIndex); 
            $.fn.loadContent(currentType, pageIndex - 1);
        };

        while (contentA > 0) {
            ++pageIndex;
            contentA -= 5;
            $("#pagination").append("<li id=" + pageIndex.toString() + " class=\"pag-item\">" + pageIndex.toString() + "</li>");
            $("#" + pageIndex.toString()).on("click", handlePage(pageIndex));
        }
        pageAmount = pageIndex;
        if (pageAmount != 0)
            $("#1").addClass("active");
        $("#pagination").append("<li id=\"next\" class=\"pag-item\"><i class=\"fa-solid fa-chevron-right\"></i></li>");
        if(pageAmount < 2)
            $("#next").addClass("disable");
    }

    //Handle pagination
    $.fn.handlePagination = (n) => {
        // console.log(n);
        $("#" + (n).toString()).addClass("active");
        for (let i = 1; i <= pageAmount; ++i)
            if (i != n)
                $("#" + i.toString()).removeClass("active");

        if (n == 1)
            $("#previous").addClass("disable");
        else
            $("#previous").removeClass("disable");

        if (n == pageAmount)
            $("#next").addClass("disable");
        else
            $("#next").removeClass("disable");

    }

    //return content amount by type
    $.fn.getContentAmount = (type) => {
        if (type == "Cầu lông")
            return typeAmount[0];
        else if (type == "Guitar")
            return typeAmount[1];
        else if (type == "Bóng đá")
            return typeAmount[2];
        else if (type == "Đọc sách")
            return typeAmount[3];
        else if (type == "Nhảy")
            return typeAmount[4];
        else if (type == "Bóng chuyền")
            return typeAmount[5];
        else if (type == "Esport")
            return typeAmount[6];
        else if (type == "Kỹ năng")
            return typeAmount[7];
        else if (type == "Mã nguồn mở")
            return typeAmount[8];
        else if (type == "Lập trình")
            return typeAmount[9];
        else if (type == "Tất cả")
            return contentAmount;
        else if (type == "Hand in hand")
            return typeAmount[11];
    }

    //load page when changing club type by these step:
    //  S1: reset pagination
    //  S2: create new pagination
    //  S3: load content by type
    //STATUS: UNFINISHED
    $.fn.resetPagination = (Type) => {

        pageAmount = 0;
        $("#pagination").empty();
        $.fn.getPaginationItem($.fn.getContentAmount(Type), Type);

        $("#previous").on("click", () => {
            $.fn.handlePagination(currentPage); 
            $.fn.loadContent(Type, currentPage - 1);
        });
        $("#next").on("click", () =>{
            $.fn.handlePagination(currentPage + 1); 
            $.fn.loadContent(Type, currentPage);
        });
    }

    $.fn.loadContent = (Type, skip) => {
        const handleTopic = (id, index) => () => {
                localStorage.setItem("id", index.toString());
                window.open("../Forum/content.html");
        };

        let x = 1, idIndex = 1;
        for (let clubIndex = 0; clubIndex < contentAmount; ++clubIndex) {
            if (x - 1 > skip * 5 + 4)
                break;
            else if(x - 1 < skip * 5 && (topics[clubIndex].type == Type || Type == "Tất cả") )    
                ++x;
            else if (topics[clubIndex].type == Type || Type == "Tất cả") {
                $("#topic" + idIndex.toString()).text(topics[clubIndex].topic);
                $("#topic" + idIndex.toString()).on("click", handleTopic(idIndex, clubIndex));
                $("#username" + idIndex.toString()).text("Author: " + topics[clubIndex].username);
                $("#type" + idIndex.toString()).text("Type: " + topics[clubIndex].type);
                ++x;
                ++idIndex;
            }
            currentPage = skip + 1;
        }

        for (let i = idIndex; i < 6; ++i) {
            $("#topic" + i.toString()).text("");
            $("#username" + i.toString()).text("");
            $("#type" + i.toString()).text("");
        }
    }



    $("#badminton").on("click", () => {
        clubindex = 0;
        currentType = "Cầu lông";
        $.fn.resetPagination(currentType);
        $.fn.loadContent(currentType, 0);
        $("#club").text(currentType);
    });

    $("#guitar").on("click", () => {
        clubindex = 0;
        currentType = "Guitar";
        $.fn.resetPagination(currentType);
        $.fn.loadContent(currentType, 0);
        $("#club").text(currentType);
    });

    $("#football").on("click", () => {
        clubindex = 0;
        currentType = "Bóng đá";
        $.fn.resetPagination(currentType);
        $.fn.loadContent(currentType, 0);
        $("#club").text(currentType);
    });

    $("#bookreader").on("click", () => {
        clubindex = 0;
        currentType = "Đọc sách";
        $.fn.resetPagination(currentType);
        $.fn.loadContent(currentType, 0);
        $("#club").text(currentType);
    });

    $("#dancing").on("click", () => {
        clubindex = 0;
        currentType = "Nhảy";
        $.fn.resetPagination(currentType);
        $.fn.loadContent(currentType, 0);
        $("#club").text(currentType);
    });

    $("#volleyball").on("click", () => {
        clubindex = 0;
        currentType = "Bóng chuyền";
        $.fn.resetPagination(currentType);
        $.fn.loadContent(currentType, 0);
        $("#club").text(currentType);
    });

    $("#esport").on("click", () => {
        clubindex = 0;
        currentType = "Esport";
        $.fn.resetPagination(currentType);
        $.fn.loadContent(currentType, 0);
        $("#club").text(currentType);
    });

    $("#skill").on("click", () => {
        clubindex = 0;
        currentType = "Kỹ năng";
        $.fn.resetPagination(currentType);
        $.fn.loadContent(currentType, 0);
        $("#club").text(currentType);
    });

    $("#opensrc").on("click", () => {
        clubindex = 0;
        currentType = "Mã nguồn mở";
        $.fn.resetPagination(currentType);
        $.fn.loadContent(currentType, 0);
        $("#club").text(currentType);
    });

    $("#coder").on("click", () => {
        clubindex = 0;
        currentType = "Lập trình";
        $.fn.resetPagination(currentType);
        $.fn.loadContent(currentType, 0);
        $("#club").text(currentType);
    });

    $("#all").on("click", () => {
        clubindex = 0;
        currentType = "Tất cả";
        $.fn.resetPagination(currentType);
        $.fn.loadContent(currentType, 0);
        $("#club").text(currentType);
    });

    $("#hih").on("click", () => {
        clubindex = 0;
        currentType = "Hand in hand";
        $.fn.resetPagination(currentType);
        $.fn.loadContent(currentType, 0);
        $("#club").text(currentType);
    });

    clubindex = 0;
    currentType = "Tất cả";
    $.fn.resetPagination(currentType);
    $.fn.loadContent(currentType, 0);
    $("#club").text(currentType);

});