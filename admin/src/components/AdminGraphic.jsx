export const AdminGraphic = () => {
  return (
    <div className='lg:col-span-2'>
      <div className='bg-white rounded-lg shadow'>
        <div className='p-4 border-b border-gray-200'>
          <h2 className='text-lg font-medium text-gray-900'>Analíticas</h2>
        </div>
        <div className='p-4'>
          {/* Sales Trend Chart */}
          <div className='mb-6'>
            <h3 className='text-sm font-medium text-gray-700 mb-2'>Ingresos</h3>
            <div className='h-64 relative'>
              {/* Chart Background Grid */}
              <div className='absolute inset-0 grid grid-cols-6 grid-rows-5'>
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className='border-t border-l border-gray-100'
                  ></div>
                ))}
              </div>

              {/* Y-axis labels */}
              <div className='absolute left-0 inset-y-0 flex flex-col justify-between text-xs text-gray-500 py-2'>
                <div>$50k</div>
                <div>$40k</div>
                <div>$30k</div>
                <div>$20k</div>
                <div>$10k</div>
                <div>$0</div>
              </div>

              {/* X-axis labels */}
              <div className='absolute bottom-0 inset-x-0 flex justify-between text-xs text-gray-500 pl-6'>
                <div>Ene</div>
                <div>Feb</div>
                <div>Mar</div>
                <div>Abr</div>
                <div>May</div>
                <div>Jun</div>
              </div>

              {/* Line Chart */}
              <div className='absolute inset-0 pl-6 pt-2 pb-5'>
                <svg
                  className='w-full h-full'
                  viewBox='0 0 300 200'
                  preserveAspectRatio='none'
                >
                  {/* Chart Line */}
                  <path
                    d='M0,180 L50,150 L100,160 L150,100 L200,80 L250,40 L300,60'
                    fill='none'
                    stroke='#3b82f6'
                    strokeWidth='3'
                  />
                  {/* Area under the line */}
                  <path
                    d='M0,180 L50,150 L100,160 L150,100 L200,80 L250,40 L300,60 L300,200 L0,200 Z'
                    fill='url(#blue-gradient)'
                    opacity='0.2'
                  />
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient
                      id='blue-gradient'
                      x1='0%'
                      y1='0%'
                      x2='0%'
                      y2='100%'
                    >
                      <stop offset='0%' stopColor='#3b82f6' />
                      <stop offset='100%' stopColor='#3b82f6' stopOpacity='0' />
                    </linearGradient>
                  </defs>

                  {/* Data points */}
                  <circle cx='0' cy='180' r='4' fill='#3b82f6' />
                  <circle cx='50' cy='150' r='4' fill='#3b82f6' />
                  <circle cx='100' cy='160' r='4' fill='#3b82f6' />
                  <circle cx='150' cy='100' r='4' fill='#3b82f6' />
                  <circle cx='200' cy='80' r='4' fill='#3b82f6' />
                  <circle cx='250' cy='40' r='4' fill='#3b82f6' />
                  <circle cx='300' cy='60' r='4' fill='#3b82f6' />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
