
USE master;
GO
IF EXISTS (SELECT * FROM sys.databases WHERE name = 'ElectronicShop')
    DROP DATABASE ElectronicShop;
GO
CREATE DATABASE ElectronicShop;
GO
USE ElectronicShop;
GO

-- 1. Accounts Table
CREATE TABLE Accounts (
    AccountID INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(50) UNIQUE NOT NULL,
    Password NVARCHAR(255) NOT NULL,
    Role NVARCHAR(20) DEFAULT 'CUSTOMER', 
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- 2. Customers Table
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY IDENTITY(1,1),
    AccountID INT FOREIGN KEY REFERENCES Accounts(AccountID) ON DELETE CASCADE,
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) UNIQUE,
    Phone NVARCHAR(20),
    Address NVARCHAR(MAX),
    LoyaltyPoints INT DEFAULT 0,
    Tier NVARCHAR(25) DEFAULT 'FREE'
);

-- 3. Products Table
CREATE TABLE Products (
    ProductID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(255) NOT NULL,
    Category NVARCHAR(50) NOT NULL, -- Phone, Laptop, Tablet, Accessory
    Description NVARCHAR(MAX),
    Price DECIMAL(18,2) NOT NULL,
    ImportPrice DECIMAL(18,2) NOT NULL,
    StockQuantity INT DEFAULT 0,
    SoldCount INT DEFAULT 0,
    ImageUrl NVARCHAR(500),
    CPU NVARCHAR(100),
    RAM NVARCHAR(50),
    Storage NVARCHAR(50),
    IsDeleted BIT DEFAULT 0,
    UpdatedAt DATETIME DEFAULT GETDATE()
);

-- 4. Orders Table
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY IDENTITY(1,1),
    CustomerID INT FOREIGN KEY REFERENCES Customers(CustomerID),
    OrderDate DATETIME DEFAULT GETDATE(),
    TotalAmount DECIMAL(18,2) NOT NULL,
    Status NVARCHAR(50) DEFAULT 'Pending', -- Pending, Shipping, Completed, Cancelled
    PaymentMethod NVARCHAR(50) DEFAULT 'COD'
);

-- 5. OrderDetails Table
CREATE TABLE OrderDetails (
    DetailID INT PRIMARY KEY IDENTITY(1,1),
    OrderID INT FOREIGN KEY REFERENCES Orders(OrderID),
    ProductID INT FOREIGN KEY REFERENCES Products(ProductID),
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(18,2) NOT NULL
);
-- 1. Bảng Nhà cung cấp (Module 1)
CREATE TABLE Suppliers (
    SupplierID INT PRIMARY KEY IDENTITY(1,1),
    SupplierName NVARCHAR(255) NOT NULL,
    ContactPhone NVARCHAR(20),
    Email NVARCHAR(100),
    CertificateUrl NVARCHAR(500), -- Chứng chỉ đại lý ủy quyền
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- 2. Bảng Lịch sử Nhập kho (Module 2)
CREATE TABLE GoodsReceipts (
    ReceiptID INT PRIMARY KEY IDENTITY(1,1),
    SupplierID INT FOREIGN KEY REFERENCES Suppliers(SupplierID),
    ImportDate DATETIME DEFAULT GETDATE(),
    TotalValue DECIMAL(18,2) DEFAULT 0,
    Note NVARCHAR(MAX)
);

-- 3. Chi tiết Nhập kho (Lưu vết biến động giá)
CREATE TABLE ReceiptDetails (
    DetailID INT PRIMARY KEY IDENTITY(1,1),
    ReceiptID INT FOREIGN KEY REFERENCES GoodsReceipts(ReceiptID),
    ProductID INT FOREIGN KEY REFERENCES Products(ProductID),
    Quantity INT NOT NULL,
    ImportPrice DECIMAL(18,2) NOT NULL -- Giá nhập tại đúng thời điểm này
);



-- SEED REAL PRODUCTS
INSERT INTO Products (Name, Category, Price, ImportPrice, StockQuantity, ImageUrl, CPU, RAM, Storage) VALUES 
('iPhone 15 Pro Max 256GB', 'Phone', 29490000, 24000000, 50, 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800', 'A17 Pro', '8GB', '256GB'),
('iPhone 14', 'Phone', 16990000, 14000000, 30, 'https://images.unsplash.com/photo-1678652197831-2d180705cd2c', 'A15 Bionic', '6GB', '128GB'),
('MacBook Pro M3 Pro 14', 'Laptop', 49990000, 42000000, 15, 'https://images.unsplash.com/photo-1517336714460-4550cc1103c7', 'M3 Pro', '18GB', '512GB'),
('MacBook Air M2', 'Laptop', 24990000, 21000000, 20, 'https://images.unsplash.com/photo-1611186871348-b1ec696e523f', 'M2', '8GB', '256GB'),
('iPad Pro M2 11 inch', 'Tablet', 21490000, 18000000, 25, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0', 'M2', '8GB', '128GB'),
('Samsung Galaxy S24 Ultra', 'Phone', 31990000, 27000000, 40, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf', 'Snapdragon 8 Gen 3', '12GB', '512GB'),
('Dell XPS 13 9315', 'Laptop', 32500000, 28000000, 10, 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45', 'Intel Core i7-1250U', '16GB', '512GB'),
('AirPods Pro Gen 2', 'Accessory', 5990000, 4500000, 100, 'https://images.unsplash.com/photo-1588423770574-91993ca06f17', 'H2 Chip', '-', '-'),
('Samsung Galaxy Tab S9', 'Tablet', 18990000, 16000000, 15, 'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e', 'Snapdragon 8 Gen 2', '8GB', '128GB'),
('Sony WH-1000XM5', 'Accessory', 8490000, 6500000, 25, 'https://images.unsplash.com/photo-1618366712277-7c300803ef76', '-', '-', '-');

-- SEED USERS
INSERT INTO Accounts (Username, Password, Role) VALUES ('admin', 'admin123', 'ADMIN'), ('anhminhhm@gmail.com', '123456', 'CUSTOMER');


UPDATE Products 
SET ImageUrl = 'https://halostore.vn/iphone-15-pro-max-256gb-chinh-hang-vn-a' 
WHERE Name = 'iPhone 15 Pro Max 256GB';
UPDATE Products 
SET ImageUrl = 'https://laptopre.vn/upload/picture/picture-11699844127.jpg' 
WHERE Name = 'MacBook Pro M3 Pro 14';
GO 
CREATE PROCEDURE sp_UpdateStock
    @ProductID INT,
    @QuantityToSubtract INT
AS
BEGIN
    -- Kiểm tra xem còn đủ hàng không
    IF EXISTS (SELECT 1 FROM Products WHERE ProductID = @ProductID AND StockQuantity >= @QuantityToSubtract)
    BEGIN
        UPDATE Products 
        SET StockQuantity = StockQuantity - @QuantityToSubtract
        WHERE ProductID = @ProductID;
    END
    ELSE
    BEGIN
        RAISERROR('Số lượng trong kho không đủ!', 16, 1);
    END
END