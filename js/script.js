var baseURL = "http://46.202.93.31/api/";

function GetCategoryData() {
    $.ajax({
        url: baseURL+"api/Category", // ✅ Ensure this matches your API endpoint
        type: "GET",
        dataType: "json",
        success: function(response) {
            
            var nav_items = $(".nav-items");
            nav_items.empty(); // ✅ Clear previous data

            side_items=$("#sidebar");

            //debugger;
            if (!response || response.length === 0) {
                console.warn("No categories found.");
                return;
            }

            $.each(response, function(index, category) {
                //debugger;
                var row = `<a href="Search.html?search_text=${encodeURIComponent(category.name)}" class="nav-item">${category.name}</a>`;
                nav_items.append(row);

                var row_side = `<a href="Search.html?search_text=${encodeURIComponent(category.name)}" class="sidebar-nav-item">${category.name}</a>`;
                side_items.append(row_side);

            });

            side_items.append(`<div class="sidebar-divider" style="border-top: 1px solid #ccc; margin: 10px 0;"></div>
    
        <div style="justify-content: space-around; padding: 4px 0;">
            <a href="index.html" style="text-decoration: none; color: white; font-size: 14px;">Home</a><br>
            <a href="about.html" style="text-decoration: none; color: white; font-size: 14px;">About</a><br>
            <a href="policy.html" style="text-decoration: none; color: white; font-size: 14px;">Policy</a><br>
            <a href="contact.html" style="text-decoration: none; color: white; font-size: 14px;">Contact</a>
        </div>`);

            $(".nav-items").hide().show(0);

            side_items.append(`<div class="sidebar-divider"></div>`);
           
        },
        error: function(xhr, status, error) {
            console.error("Error loading categories:", error);
            alert("Failed to load categories: " + xhr.responseText);
        }
    });
}

var Rating = ["","★","★★","★★★","★★★★","★★★★★"];

function GetProductData(limit=null,search_text=null) {
    debugger;
    let url = baseURL + "api/Product";

    // Append query parameters if provided
    let params = [];
    if (limit !== null) params.push("limit=" + encodeURIComponent(limit));
    if (search_text !== null && search_text.trim() !== "") params.push("search_text=" + encodeURIComponent(search_text));

    // If there are any query parameters, append them to the URL
    if (params.length > 0) {
        url += "?" + params.join("&");
    }

    //var badge=["Bestseller","New","Popular","Hot Deal"];
      var badge=["","","",""];

    $.ajax({
        url: url, // Change API URL as needed
        type: "GET",
        success: function (data) {
            debugger;
            let tbody = $(".product-grid");
            tbody.empty();

            $.each(data, function (index, product) {

                var html=`
            <a onclick="ProductView(${product.id}, '${product.productURL}')" class="product-link">
                <div class="product-card">
                    <div class="badge" style="display:none;">${badge[index]}</div>
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-content">
                        <p class="product-code">CA $${product.price}</p>
                        <p class="product-name">${product.name}</p>
                        <div class="product-rating">
                            <span class="stars">${Rating[product.rting]}</span>
                            <span class="review-count">${product.rting}</span>
                            &nbsp;&nbsp; <span class="vendor" onclick="searchVendor(${product.vendor.name})"> ${product.vendor.name} </span>
                        </div>
                    </div>
                    <div class="add-to-cart action-btn">Buy</div>
                </div>
            </a>
                `;

                if(search_text!=null)
                {
                   html=`
            <div class="product-item">
                <div class="product-badge"  style="display:none;"></div>
                <div class="product-content">
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-dots">
                        <span class="dot active"></span>
                    </div>
                    <p class="product-price">From $${product.price} with education savings</p>
                    <a onclick="ProductView(${product.id}, '${product.productURL}')" ><button class="buy-btn" style="position: absolute; bottom: 10px; left:70%; float:right;">Buy</button></a>
                </div>
            </div>
                `;

                }

                tbody.append(html);
            });
            
        },
        error: function (xhr) {
            console.error("Failed to load products:", xhr.responseText);
        }
    });
}

function searchVendor(vendorName) {
    window.open(`Search.html?search_text=${encodeURIComponent(vendorName)}`, '_blank');
}

function GetProductDataById(id)
{
    let url = baseURL + "api/Product/"+id;

    $.ajax({
        url: url, // Change API URL as needed
        type: "GET",
        success: function (data) {
           console.log(data);
           $('.product-name').text(data.name);
           $('.product-price').text(data.price);
           $('.product-description').text(data.shortDescription);
           $('.product-description-long').text(data.longDescription);
           $(".main-image").attr("src", data.image);
           $(".thumbnail").attr("src", data.image);
           $(".color-image").attr("src", data.image);
        },
        error: function (xhr) {
            console.error("Failed to load product:", xhr.responseText);
        }
    });
}

function AddVendorEvent()
{
    document.getElementById('vendorSearchInput').addEventListener('input', function() {
        let filter = this.value.toLowerCase();
        let dropdown = document.getElementById('vendorDropdownMenu');
        let options = dropdown.getElementsByClassName('vendor-option');
        let hasVisibleOptions = false;
        
        for (let i = 0; i < options.length; i++) {
            let text = options[i].textContent.toLowerCase();
            if (text.includes(filter)) {
                options[i].style.display = "block";
                hasVisibleOptions = true;
            } else {
                options[i].style.display = "none";
            }
        }
        
        dropdown.style.display = hasVisibleOptions ? "block" : "none";
    });
}

function GetVendorData() { 
    $.ajax({
        url: baseURL + "api/Vendor", // Ensure API URL is correct
        type: "GET",
        dataType: "json",
        success: function(response) {
            let vendorMenu = $("#vendorDropdownMenu");
            vendorMenu.empty(); // Clear previous vendors
            vendorMenu.append(`<input type="text" class="vendor-search-input" id="vendorSearchInput" placeholder="Search vendor...">`);
            // Populate vendor list dynamically
            response.forEach(function(vendor) {
                vendorMenu.append(`<div class="vendor-option"><a style="text-decoration:none;" href="Search.html?search_text=${encodeURIComponent(vendor.name)}"> ${vendor.name} </a></div>`);
            });

            // Bind click event to dynamically added vendor options
            $(".vendor-option").on("click", function() {
                let selectedVendor = $(this).text();
                $("#vendorSearchLabel").text(selectedVendor); // Show selected vendor
            });

            AddVendorEvent();

        },
        error: function(xhr, status, error) {
            console.error("Error fetching vendors:", error);
        }
    });
}


function ProductView(productId,productURL){

        let viewDate = new Date().toISOString(); // Get current datetime in ISO format

        // AJAX call to save product view
        $.ajax({
            url: baseURL+"api/ProductView?ProductId=" + productId, 
            type: "POST",
            contentType: "application/json",
            success: function (response) {
                // Navigate to the product URL after successful API call
                window.open(productURL, "_blank");
            },
            error: function (xhr, status, error) {
                console.error("Error saving product view:", error);
                // Fallback: Navigate to the URL even if the request fails
                window.open(productURL, "_blank");
            }
        });
}


$(document).ready(function () {
    $("#contactForm").on("submit", function (e) {
        e.preventDefault(); // Prevent default form submission

        let formData = {
            FirstName: $("#firstName").val(),
            LastName: $("#lastName").val(),
            PhoneNumber: $("#phoneNumber").val(),
            Email: $("#email").val(),
            BusinessName: $("#businessName").val(),
            WebsiteURL: $("#websiteURL").val(),
            Message: $("#message").val()
        };

        $.ajax({
            url: baseURL+"api/ContactForm/add", // API URL
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (response) {
                alert(response.message);
                $("#contactForm")[0].reset(); // Reset form fields
            },
            error: function (xhr, status, error) {
                console.error("Error submitting form:", error);
                alert("Failed to submit the form. Please try again.");
            }
        });
    });
});
