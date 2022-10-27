
INSERT INTO `users` (`id`, `name`, `gender`, `email`, `contact`, `password`, `type`, `city`, `pincode`, `address`, `status`, `date`) VALUES
(11,'Ravinder Singh', 'Male', 'ravi@gmail.com', '7896543214', 'password', 'customer','Ropar','140001','Zail Singh Nagar','ACTIVE', '21/07/2021'),
(2, 'Radhika Sharma', 'Female', 'radhika@gmail.com', '6896543214', 'password', 'customer','Ropar','147801','Chandigarh','ACTIVE', '11/05/2021'),
(3, 'Upender Kumar', 'Male', 'upender@gmail.com', '8896543214', 'password', 'customer','Panchkula','149001','Panchkula','DISABLED', '11/08/2021'),
(4, 'Richa Sharma', 'Female', 'richa@gmail.com', '9896543214', 'password', 'customer','Amritsar','140001','Amritsar','ACTIVE', '22/06/2021'),
(5, 'Deepika Thakur', 'Female', 'deepika@gmail.com', '9596543214', 'password', 'customer','Panchkula','140001','Nava Gaun Panchkula','ACTIVE', '20/01/2021'),
(6, 'Pawan Kumar', 'Male', 'pawan@gmail.com', '8196543214', 'password', 'customer','Ropar','140001','Rail majra, Ropar','ACTIVE', '27/04/2021'),
(7, 'Rahul Gautam', 'Male', 'rahul@gmail.com', '7896543214', 'password', 'customer','Ghanauli','140001','Ghanauli','ACTIVE', '30/04/2021'),
(8, 'Paras Kondal', 'Male', 'paras@gmail.com', '9196543214', 'password', 'customer','Himachal','140001','Nangal','ACTIVE', '21/03/2021');


INSERT INTO `orders` (`id`, `userId`, `products`, `date`, `status`, `address`, `payment`, `price`) VALUES
(11, '1', 'Puma White Tshirt_12', '21/07/2021', 'PENDING', "{'cName':'Ravinder Singh', 'cEmail':'ravi@gmail.com','cContact':'869640838','cAddress':'Golden City','cCity':'Ropar','cPincode':'140001','country':'India'}", 'Paypal', 'Rs 1200'),
(2, '2', 'Red Umbrella Full Dress_12', '31/07/2021', 'PENDING', "{'cName':'Radhika Sharma', 'cEmail':'radhika@gmail.com','cContact':'969640838','cAddress':'Golden City','cCity':'Himachal','cPincode':'142001','country':'India'}", 'UPI', 'Rs 1200'),
(3, '3', 'White Half Sleeve T-shirt_12', '11/07/2021', 'PENDING', "{'cName':'Upender Kumar', 'cEmail':'upender@gmail.com','cContact':'899640838','cAddress':'Golden City','cCity':'Panchkula','cPincode':'141001','country':'India'}", 'Credit/Debit card', 'Rs 1200'),
(4, '4', 'Realme Narzo 30 Pro 5G_12', '31/08/2021', 'PENDING', "{'cName':'Richa Sharma', 'cEmail':'richa@gmail.com','cContact':'709640838','cAddress':'Golden City','cCity':'Chhandigarh','cPincode':'143001','country':'India'}", 'Cash On Delivery', 'Rs 1200'),
(5, '5', 'JBL Headphones_12', '05/09/2021', 'PENDING', "{'cName':'Deepika Thakur', 'cEmail':'deepika@gmail.com','cContact':'768640838','cAddress':'Golden City','cCity':'Nangal','cPincode':'145001','country':'India'}", 'UPI', 'Rs 1200'),
(6, '6', 'Blue Long Sleeves Tshirt_12', '02/03/2021', 'PENDING', "{'cName':'Pawan Kumar', 'cEmail':'pawan@gmail.com','cContact':'754640838','cAddress':'Golden City','cCity':'Ghanauli','cPincode':'146001','country':'India'}", 'UPI', 'Rs 1200'),
(7, '7', 'Puma Black Jacket_12', '01/01/2021', 'PENDING', "{'cName':'Rahul Gautam', 'cEmail':'rahul@gmail.com','cContact':'969640838','cAddress':'Golden City','cCity':'Chhandigarh','cPincode':'147001','country':'India'}", 'Paypal', 'Rs 1200'),
(8, '8', 'Red Umbrella Full Dress_12', '11/02/2021', 'PENDING', "{'cName':'Paras Kondal', 'cEmail':'paras@gmail.com','cContact':'969690838','cAddress':'Golden City','cCity':'Chhandigarh','cPincode':'148001','country':'India'}", 'Cash On Delivery', 'Rs 1200');
