import React from 'react'

export const AboutPage = () => {
  return (
    <section className="max-w-7xl mt-10 mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Shop.Co</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Your trusted destination for premium fashion, quality products,
          and an exceptional online shopping experience.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
            alt="About Shop Co"
            loading='lazy'
            className="rounded-2xl shadow-lg w-full"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
          <p className="text-gray-600 mb-4">
            Shop.Co was created with a simple mission: to make high-quality
            fashion accessible to everyone. We believe that style is more than
            clothing—it's a way to express confidence, personality, and
            individuality.
          </p>

          <p className="text-gray-600 mb-4">
            Our carefully curated collections feature the latest trends,
            timeless essentials, and premium-quality products designed to fit
            every lifestyle. Whether you're looking for casual wear, formal
            outfits, or everyday essentials, Shop.Co has something for you.
          </p>

          <p className="text-gray-600">
            We are committed to delivering exceptional value, secure shopping,
            and outstanding customer service to customers across the country.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="text-center p-6 border rounded-2xl">
          <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
          <p className="text-gray-600">
            To provide stylish, high-quality products at affordable prices
            while ensuring a seamless shopping experience.
          </p>
        </div>

        <div className="text-center p-6 border rounded-2xl">
          <h3 className="text-2xl font-bold mb-2">Our Vision</h3>
          <p className="text-gray-600">
            To become a leading fashion destination known for quality,
            innovation, and customer satisfaction.
          </p>
        </div>

        <div className="text-center p-6 border rounded-2xl">
          <h3 className="text-2xl font-bold mb-2">Our Promise</h3>
          <p className="text-gray-600">
            Premium products, secure payments, fast delivery, and dedicated
            customer support every step of the way.
          </p>
        </div>
      </div>

      <div className="mt-16 bg-black text-white rounded-3xl p-10 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Join the Shop.Co Community
        </h2>
        <p className="max-w-2xl mx-auto text-gray-300">
          Thousands of customers trust Shop.Co for their fashion needs. Join
          our growing community and discover products that inspire confidence
          and style every day.
        </p>
      </div>
    </section>
  )
}
