var baseURL = "http://46.202.93.31/api/";

$(document).ready(function() {

    $("#loginForm").submit(function(event) {
        event.preventDefault(); // Prevent page refresh

        var email = $("#email").val();
        var password = $("#password").val();

        $.ajax({
            url: baseURL+"api/User/login", // Update with your API URL
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ email: email, password: password }),
            success: function(response) {
                localStorage.setItem("user", JSON.stringify(response)); // Store user data
                alert("Login successful! Redirecting...");
                window.location.href = "home.html"; // Redirect after login
            },
            error: function(xhr) {
                alert("Login failed: " + xhr.responseJSON.message);
            }
        });
    });

});

function GetCount(endpoint) {
    $.ajax({
        url: baseURL + "api/" + endpoint, // Constructing the endpoint URL dynamically
        type: "GET",
        dataType: "json",
        success: function(response) {
            var count = response.length; // Count the items in response
            $("#" + endpoint + "Count").text(count); // Dynamically update the corresponding count element
        },
        error: function() {
            console.error("Error fetching data from " + endpoint);
            $("#" + endpoint + "Count").text("0"); // Set to 0 in case of error
        }
    });
}

function UpdateUserData()
{
    debugger;
    var user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        $(".userName").text(user.name);
    }   
}

function GetCategory()
{
    $.ajax({
        type: "POST",
        url: "Views/Category.html",
        data: "",
        cache: false,
        success: function(html) {
         document.getElementById("content").innerHTML = html;
         $('.NotView').hide();
         GetCategoryData();
        }
    });    
}

function GetCategoryData() {
    $.ajax({
        url: baseURL+"api/Category", // ✅ Ensure this matches your API endpoint
        type: "GET",
        dataType: "json",
        success: function(response) {
            var tbody = $("#CategoryTable tbody");
            tbody.empty(); // ✅ Clear previous data
            
            if (response.length === 0) {
                tbody.append("<tr><td colspan='3' class='text-center'>No Categories Found</td></tr>");
                return;
            }

            $.each(response, function(index, category) {
                var row = `<tr>
                    <td style="text-align:center;">${index + 1}</td>
                    <td>${category.name}</td>
                    <td style="text-align:center;"><i class="fa fa-trash delete-icon" style="text-align:center; cursor: pointer; " onclick="DeleteCategory(${category.id})"></i></td>
                </tr>`;
                tbody.append(row);
            });
            scrollToTop();
        },
        error: function(xhr, status, error) {
            console.error("Error loading categories:", error);
            alert("Failed to load categories: " + xhr.responseText);
        }
    });
}

function SaveCategory() {
    var categoryName = $("#name").val().trim(); // Get input value

    if (categoryName === "") {
        alert("Please enter a category name."); // Validation check
        return;
    }

    $.ajax({
        url: baseURL+"api/Category", // ✅ Adjust the URL based on your API route
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ name: categoryName }), // Send JSON data
        success: function(response) {
            alert("Category saved successfully!");
            $("#name").val(""); // Clear input field after success
            GetCategoryData(); // Refresh table data
        },
        error: function(xhr, status, error) {
            console.error("Error:", xhr.status, xhr.responseText);
            alert("Failed to save category: " + (xhr.responseText || "Unknown error"));
        }
    });
}

function DeleteCategory(id) {
    if (confirm("Are you sure you want to delete this category?")) {
        fetch(baseURL+`api/Category/${id}`, { // Update with your API URL
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                alert("Category deleted successfully!");
                GetCategoryData();
            } else {
                alert("Failed to delete category!");
            }
        })
        .catch(error => console.error("Error:", error));
    }
}


// Company 

function GetCompany()
{
    $.ajax({
        type: "POST",
        url: "Views/Company.html",
        data: "",
        cache: false,
        success: function(html) {
         document.getElementById("content").innerHTML = html;
         $('.NotView').hide();
         GetCompanyData();
        }
    });    
}

function GetCompanyData() {
    $.ajax({
        url: baseURL+"api/Company", // ✅ Ensure this matches your API endpoint
        type: "GET",
        dataType: "json",
        success: function(response) {
            var tbody = $("#CompanyTable tbody");
            tbody.empty(); // ✅ Clear previous data
            
            if (response.length === 0) {
                tbody.append("<tr><td colspan='3' class='text-center'>No Companies Found</td></tr>");
                return;
            }

            $.each(response, function(index, company) {
                var row = `<tr>
                    <td style="text-align:center;">${index + 1}</td>
                    <td>${company.name}</td>
                    <td style="text-align:center;"><i class="fa fa-trash delete-icon" style="text-align:center; cursor:Pointer;" onclick="DeleteCompany(${company.id})"></i></td>
                </tr>`;
                tbody.append(row);
            });
            scrollToTop();
        },
        error: function(xhr, status, error) {
            console.error("Error loading companies:", error);
            alert("Failed to load companies: " + xhr.responseText);
        }
    });
}

function SaveCompany() {
    var CompanyName = $("#name").val().trim(); // Get input value

    if (CompanyName === "") {
        alert("Please enter a Company name."); // Validation check
        return;
    }

    $.ajax({
        url: baseURL+"api/Company", // ✅ Adjust the URL based on your API route
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ name: CompanyName }), // Send JSON data
        success: function(response) {
            alert("Company saved successfully!");
            $("#name").val(""); // Clear input field after success
            GetCompanyData(); // Refresh table data
        },
        error: function(xhr, status, error) {
            console.error("Error:", xhr.status, xhr.responseText);
            alert("Failed to save company: " + (xhr.responseText || "Unknown error"));
        }
    });
}

function DeleteCompany(id) {
    if (confirm("Are you sure you want to delete this Company?")) {
        fetch(baseURL+`api/Company/${id}`, { // Update with your API URL
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                alert("Company deleted successfully!");
                GetCompanyData();
            } else {
                alert("Failed to delete Company!");
            }
        })
        .catch(error => console.error("Error:", error));
    }
}

// Province

function GetProvince()
{
    $.ajax({
        type: "POST",
        url: "Views/Province.html",
        data: "",
        cache: false,
        success: function(html) {
         document.getElementById("content").innerHTML = html;
         $('.NotView').hide();
         GetProvinceData();
        }
    });    
}

/*
function GetCompany()
{
    $.ajax({
        type: "POST",
        url: "Views/Company.html",
        data: "",
        cache: false,
        success: function(html) {
         document.getElementById("content").innerHTML = html;
         $('.NotView').hide();
         GetCompanyData();
        }
    });    
}
    */

function GetProvinceData() {
    $.ajax({
        url: baseURL+"api/Province", // ✅ Ensure this matches your API endpoint
        type: "GET",
        dataType: "json",
        success: function(response) {
            var tbody = $("#ProvinceTable tbody");
            tbody.empty(); // ✅ Clear previous data
            
            if (response.length === 0) {
                tbody.append("<tr><td colspan='3' class='text-center'>No Provinces Found</td></tr>");
                return;
            }

            $.each(response, function(index, Province) {
                var row = `<tr>
                    <td style="text-align:center;">${index + 1}</td>
                    <td>${Province.name}</td>
                    <td style="text-align:center;"><i class="fa fa-trash delete-icon" style="text-align:center; cursor:pointer;" onclick="DeleteProvince(${Province.id})"></i></td>
                </tr>`;
                tbody.append(row);
            });
            scrollToTop();
        },
        error: function(xhr, status, error) {
            console.error("Error loading Provinces:", error);
            alert("Failed to load Province: " + xhr.responseText);
        }
    });
}

function SaveProvince() {
    var ProvinceName = $("#name").val().trim(); // Get input value

    if (ProvinceName === "") {
        alert("Please enter a Province name."); // Validation check
        return;
    }

    $.ajax({
        url: baseURL+"api/Province", // ✅ Adjust the URL based on your API route
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ name: ProvinceName }), // Send JSON data
        success: function(response) {
            alert("Province saved successfully!");
            $("#name").val(""); // Clear input field after success
            GetProvinceData(); // Refresh table data
        },
        error: function(xhr, status, error) {
            console.error("Error:", xhr.status, xhr.responseText);
            alert("Failed to save Province: " + (xhr.responseText || "Unknown error"));
        }
    });
}

function DeleteProvince(id) {
    if (confirm("Are you sure you want to delete this Province?")) {
        fetch(baseURL+`api/Province/${id}`, { // Update with your API URL
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                alert("Province deleted successfully!");
                GetProvinceData();
            } else {
                alert("Failed to delete Province!");
            }
        })
        .catch(error => console.error("Error:", error));
    }
}
// Vendor 

function GetVendor()
{
    $.ajax({
        type: "POST",
        url: "Views/Vendor.html",
        data: "",
        cache: false,
        success: function(html) {
         document.getElementById("content").innerHTML = html;
         $('.NotView').hide();
         GetVendorData();
        }
    });    
}

function GetVendorData() {
    $.ajax({
        url: baseURL+"api/Vendor", // ✅ Ensure this matches your API endpoint
        type: "GET",
        dataType: "json",
        success: function(response) {
            var tbody = $("#VendorTable tbody");
            tbody.empty(); // ✅ Clear previous data
            
            if (response.length === 0) {
                tbody.append("<tr><td colspan='3' class='text-center'>No Vendors Found</td></tr>");
                return;
            }

            $.each(response, function(index, Vendor) {
                var row = `<tr>
                    <td style="text-align:center;">${index + 1}</td>
                    <td>${Vendor.name}</td>
                    <td style="text-align:center;"><i class="fa fa-trash delete-icon" style="text-align:center; cursor:pointer;" onclick="DeleteVendor(${Vendor.id})"></i></td>
                </tr>`;
                tbody.append(row);
            });
            scrollToTop();
        },
        error: function(xhr, status, error) {
            console.error("Error loading categories:", error);
            alert("Failed to load categories: " + xhr.responseText);
        }
    });
}

function SaveVendor() {
    var VendorName = $("#name").val().trim(); // Get input value

    if (VendorName === "") {
        alert("Please enter a Vendor name."); // Validation check
        return;
    }

    $.ajax({
        url: baseURL+"api/Vendor", // ✅ Adjust the URL based on your API route
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ name: VendorName }), // Send JSON data
        success: function(response) {
            alert("Vendor saved successfully!");
            $("#name").val(""); // Clear input field after success
            GetVendorData(); // Refresh table data
        },
        error: function(xhr, status, error) {
            console.error("Error:", xhr.status, xhr.responseText);
            alert("Failed to save Vendor: " + (xhr.responseText || "Unknown error"));
        }
    });
}

function DeleteVendor(id) {
    if (confirm("Are you sure you want to delete this Vendor?")) {
        fetch(baseURL+`api/Vendor/${id}`, { // Update with your API URL
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                alert("Vendor deleted successfully!");
                GetVendorData();
            } else {
                alert("Failed to delete Vendor!");
            }
        })
        .catch(error => console.error("Error:", error));
    }
}


// Product 

function GetProducts()
{
    $.ajax({
        type: "POST",
        url: "Views/Product.html",
        data: "",
        cache: false,
        success: function(html) {
         document.getElementById("content").innerHTML = html;
         $('.NotView').hide();
         GetProductData();
         LoadDropdowns();
        }
    });    
}

// ✅ Function to Fetch and Display Product List
function GetProductData() {
    $.ajax({
        url: baseURL+"api/Product", // Change API URL as needed
        type: "GET",
        success: function (data) {
            let tbody = $("#ProductTable tbody");
            tbody.empty();
            $.each(data, function (index, product) {
                tbody.append(`
                    <tr>
                        <td style="text-align:center;">${index + 1}</td>
                        <td>${product.name}</td>
                        <td>${product.shortDescription}</td>
                        <td>${product.longDescription}</td>
                        <td><img src="${product.image}" width="50"></td>
                        <td>${product.price}</td>
                        <td>${product.stock}</td>
                        <td>${product.category ? product.category.name : 'N/A'}</td>
                        <td>${product.vendor ? product.vendor.name : 'N/A'}</td>
                        <td><a href="${product.productURL}" target="_blank">Link</a></td>
                        <td>${product.rting}</td>
                        <td>${product.company ? product.company.name : 'N/A'}</td>
                        <td>${product.province ? product.province.name : 'N/A'}</td>
                        <td style="text-align:center;"><i class="fa fa-trash delete-icon" style="text-align:center; cursor:pointer;" onclick="DeleteProduct(${product.id})"></i></td>
                    </tr>
                `);
            });
            scrollToTop();
        },
        error: function (xhr) {
            console.error("Failed to load products:", xhr.responseText);
        }
    });
}

// ✅ Function to Upload Image
function UploadImage(callback) {
    let file = $("#productImage")[0].files[0];

    if (!file) {
        callback(null);
        return;
    }

    let formData = new FormData();
    formData.append("file", file);

    $.ajax({
        url: baseURL+"api/Product/UploadImage",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function (imageUrl) {
            callback(imageUrl);
        },
        error: function (xhr) {
            console.error("Image upload failed:", xhr.responseText);
            callback(null);
        }
    });
}

// ✅ Function to Save a New Product
function SaveProduct() {
    UploadImage(function (imageUrl) {
        let productData = {
            name: $("#productName").val(),
            shortDescription: $("#productShortDesc").val(),
            longDescription: $("#productLongDesc").val(),
            image: imageUrl,
            price: parseFloat($("#productPrice").val()),
            stock: parseInt($("#productStock").val()),
            categoryId: parseInt($("#categoryDropdown").val()),
            companyId: parseInt($("#companyDropdown").val()),
            provinceId: parseInt($("#provinceDropdown").val()),
            vendorId: parseInt($("#vendorDropdown").val()),
            productURL: $("#productURL").val(),
            rting: parseInt($("#ratingDropdown").val())
        };

        $.ajax({
            url: baseURL+"api/Product",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(productData),
            success: function () {
                alert("Product saved successfully!");
                GetProductData(); // Refresh product list
            },
            error: function (xhr) {
                console.error("Error saving product:", xhr.responseText);
            }
        });
    });
}

function DeleteProduct(id) {
    if (confirm("Are you sure you want to delete this Product?")) {
        fetch(baseURL+`api/Product/${id}`, { // Update with your API URL
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                alert("Product deleted successfully!");
                GetProductData();
            } else {
                alert("Failed to delete Product!");
            }
        })
        .catch(error => console.error("Error:", error));
    }
}

// Product View 

function GetProductsView()
{
    $.ajax({
        type: "POST",
        url: "Views/ProductView.html",
        data: "",
        cache: false,
        success: function(html) {
         document.getElementById("content").innerHTML = html;
         $('.NotView').hide();
         GetProductViewData();
        }
    });    
}

// ✅ Function to Fetch and Display Product List
function GetProductViewData() {
    $.ajax({
        url: baseURL+"api/ProductView", // Change API URL as needed
        type: "GET",
        success: function (data) {
            let tbody = $("#productViewTable tbody");
            tbody.empty();
            $.each(data, function (index, productView) {
                tbody.append(`
                    <tr>
                        <td style="text-align:center;">${index + 1}</td>
                        <td>${productView.viewDate}</td>
                        <td>${productView.product.name}</td>
                        <td>${productView.product.shortDescription}</td>
                        <td>${productView.product.longDescription}</td>
                        <td><img src="${productView.product.image}" width="50"></td>
                        <td>${productView.product.price}</td>
                        <td>${productView.product.stock}</td>
                        <td>${productView.product.category ? productView.product.category.name : 'N/A'}</td>
                        <td>${productView.product.vendor ? productView.product.vendor.name : 'N/A'}</td>
                        <td><a href="${productView.product.productURL}" target="_blank">Link</a></td>
                        <td>${productView.product.rting}</td>
                        <td>${productView.product.company ? productView.product.company.name : 'N/A'}</td>
                        <td>${productView.product.province ? productView.product.province.name : 'N/A'}</td>
                    </tr>
                `);
            });
            scrollToTop();
        },
        error: function (xhr) {
            console.error("Failed to load products:", xhr.responseText);
        }
    });
}

// Contact 

function GetContacts()
{
    $.ajax({
        type: "POST",
        url: "Views/Contact.html",
        data: "",
        cache: false,
        success: function(html) {
         document.getElementById("content").innerHTML = html;
         $('.NotView').hide();
         GetContactData();
        }
    });    
}

function GetContactData()
{
    $.ajax({
        url: baseURL+"api/ContactForm/get",
        type: "GET",
        success: function (data) {
            let tableBody = $("#contactTable tbody");
            tableBody.empty(); // Clear previous data

            $.each(data, function (index, contact) {
                let row = `
                    <tr>
                        <td style='text-align:center;'>${index + 1}</td>
                        <td>${contact.firstName}</td>
                        <td>${contact.lastName}</td>
                        <td>${contact.phoneNumber}</td>
                        <td>${contact.email}</td>
                        <td>${contact.businessName || "-"}</td>
                        <td>${contact.websiteURL || "-"}</td>
                        <td>${contact.message || "-"}</td>
                        <td>${new Date(contact.createdAt).toLocaleString()}</td>
                    </tr>
                `;
                tableBody.append(row);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error fetching contacts:", error);
            alert("Failed to load contact data.");
        }
    });
}

// ✅ Function to Populate Dropdowns for Category, Company, and Province
function PopulateDropdown(url, dropdownId, placeholder) {
    $.ajax({
        url: url,
        type: "GET",
        success: function (data) {
            let dropdown = $(dropdownId);
            dropdown.empty();
            dropdown.append(`<option value="">Select ${placeholder}</option>`);
            $.each(data, function (index, item) {
                dropdown.append(`<option value="${item.id}">${item.name}</option>`);
            });
        },
        error: function (xhr) {
            console.error(`Failed to load ${placeholder}:`, xhr.responseText);
        }
    });
}

// ✅ Function to Load Dropdown Data
function LoadDropdowns() {
    PopulateDropdown(baseURL+"api/Category", "#categoryDropdown", "Category");
    PopulateDropdown(baseURL+"api/Company", "#companyDropdown", "Company");
    PopulateDropdown(baseURL+"api/Province", "#provinceDropdown", "Province");
    PopulateDropdown(baseURL+"api/Vendor", "#vendorDropdown", "Vendor");
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

