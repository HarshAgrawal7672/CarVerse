import React from 'react'

function InfoSection() {
  return (
    <div>
      <section>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
      <div>
        <div className="max-w-lg md:max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h2>

          <p className="mt-4 text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur doloremque saepe
            architecto maiores repudiandae amet perferendis repellendus, reprehenderit voluptas
            sequi.
          </p>
        </div>
      </div>

      <div>
        <img
          src="https://www.financialexpress.com/wp-content/uploads/2024/10/Mercedes-Benz-E-Class-LWB.jpg"
          className="rounded"
          alt=""
        />
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default InfoSection
