# Artify

Artify is a web application built using Next.js and MongoDB, designed for artists to sell their artwork, like others' work, and manage their collections. The platform supports user registration and login through credentials or Google accounts using NextAuth. Users can add works to their cart and complete purchases using Stripe integration. The app also includes features for viewing orders, managing wishlists, and performing CRUD operations on artworks.

## Features

- **User Authentication**: Register and login with credentials or Google accounts via NextAuth.
- **Artwork Management**: Upload, update, and delete your artwork.
- **Wishlist**: Like artworks to add them to your wishlist.
- **Cart and Checkout**: Add artworks to your cart and proceed to checkout using Stripe.
- **Order Management**: View your orders in the order section after successful payment.
- **Responsive Design**: Optimized for various screen sizes.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **MongoDB**: NoSQL database for storing user and artwork data.
- **NextAuth**: Authentication library for handling user login and registration.
- **Stripe**: Payment gateway integration for handling checkout and payments.
- **Webhooks**: Used to create orders upon successful payment.

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/artify.git
   cd artify
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   MONGO_URL=your_mongodb_connection_string
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_next_auth_secret
   NEXT_PUBLIC_STRIPE_SECRET_KEY=your_next_public_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_next_public_stripe_publishable_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

4. **Run the Application**
   ```bash
   npm run dev
   ```

5. **Stripe Webhooks**
   Start the Stripe CLI and forward webhook events to your local server:
   ```bash
   stripe listen --events checkout.session.completed --forward-to localhost:3000/api/order
   ```

## Usage

1. **Register or Login**
   - Register a new account or login using your credentials or Google account.
   
2. **Upload Artwork**
   - Navigate to the upload section to add your artwork with details such as title, description, category, and price.

3. **Manage Artworks**
   - Update or delete your uploaded artworks from the management section.

4. **Like and Wishlist**
   - Browse and like artworks to add them to your wishlist for future reference.

5. **Add to Cart and Checkout**
   - Add desired artworks to your cart and proceed to checkout using Stripe integration. Upon successful payment, view your orders in the order section.

## Images

<!-- Add any screenshots or images here -->
![Register](https://github.com/ayesha-khalid89/artify/assets/159626121/a9b4f778-6ee9-4d87-b3b4-2e6cd129b8cb)
![Login](https://github.com/ayesha-khalid89/artify/assets/159626121/a56709e1-b3d6-4e8b-925e-fc704c8605a0)
![Create_Work](https://github.com/ayesha-khalid89/artify/assets/159626121/08200735-82bf-4a10-8f67-32dac1aba6aa)
![Your_Shop](https://github.com/ayesha-khalid89/artify/assets/159626121/277421e4-b570-4d8d-9ce1-bf572db7b763)
![Add_To_Cart](https://github.com/ayesha-khalid89/artify/assets/159626121/8990efd1-5685-4c21-b945-a626bbdbe891)
![Cart](https://github.com/ayesha-khalid89/artify/assets/159626121/5b352f5b-6092-4daf-9386-18f7a78bc972)
![Stripe_Checkout](https://github.com/ayesha-khalid89/artify/assets/159626121/5d48edda-64bb-4f2e-8ca0-ec79eb129d68)
![Success](https://github.com/ayesha-khalid89/artify/assets/159626121/568f8382-5003-4f29-9c0b-ee016256415d)
![Your_Orders](https://github.com/ayesha-khalid89/artify/assets/159626121/b10b8db8-8778-413a-b792-105a1ba70d08)

```

Replace placeholders like `your-username`, `your_mongodb_connection_string`, `your_google_client_id`, `your_google_client_secret`, `your_next_auth_secret`, `your_next_public_stripe_secret_key`, `your_next_public_stripe_publishable_key`, and `your_stripe_webhook_secret` with your actual values. 
