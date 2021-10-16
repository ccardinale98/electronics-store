const db = require('./connection');
const { User, Product, Category } = require('../models');

const url = ""

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Computers' },
    { name: 'Motherboards' },
    { name: 'CPUs' },
    { name: 'GPUs' },
    { name: 'Cases' },
    { name: 'PSUs' },
    { name: 'Storage' },
    { name: 'RAM' },
    { name: 'Peripherals' },
  ]);

  console.log('categories seeded electronics');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'PowerSpec G509 Gaming PC',
      description:
        'AMD Ryzen 5 5600X 3.7GHz Processor; NVIDIA RTX 3060 12GB GDDR6; 16GB DDR4-2666 RAM; 500GB SSD',
      image: 'https://res.cloudinary.com/dxw7l6liy/image/upload/v1634398405/cloudinary/g509_vvas0w.jpg',
      category: categories[0]._id,
      price: 1199.99,
      quantity: 25
    },
    {
      name: 'Acer Aspire TC-875-UR13 Desktop Computer',
      description:
        'Intel Core i5 10400 2.9GHz Processor; 8GB DDR4-2666 RAM; 512GB SSD; Intel UHD Graphics 630',
      image: 'https://res.cloudinary.com/dxw7l6liy/image/upload/v1634398405/cloudinary/aspire_j2oohd.jpg',
      category: categories[0]._id,
      price: 499.99,
      quantity: 25
    },
    {
      name: 'Dell OptiPlex 3080 SFF Desktop Computer',
      category: categories[0]._id,
      description:
        'Intel Core i5 10505 3.2GHz Processor; 8GB DDR4-2400 RAM; 256GB Solid State Drive; Intel UHD Graphics 630',
      image: 'https://res.cloudinary.com/dxw7l6liy/image/upload/v1634398406/cloudinary/optiplex_amy8iv.jpg',
      price: 799.99,
      quantity: 25
    },
    {
      name: 'ASUS X570 ROG Crosshair VIII Dark Hero AMD AM4 ATX Motherboard',
      category: categories[1]._id,
      description:
        'ROG Crosshair VIII Dark Hero gaming motherboard takes the enthusiast Crosshair pedigree to the next level with VRM power upgrade and passive chipset cooling solution, ready for the latest Zen 3 Ryzen 5000 Series. Featuring onboard Wi-Fi 6 (802.11ax), 2.5 Gbps Ethernet, and PCIe 4.0, Dark Hero is primed to deliver ultimate gaming performance.',
      image: 'https://res.cloudinary.com/dxw7l6liy/image/upload/v1634398406/cloudinary/x570_i4sear.jpg',
      price: 449.99,
      quantity: 50
    },
    {
      name: 'ASUS Z590-A PRIME Intel LGA 1200 ATX Motherboard',
      category: categories[1]._id,
      description:
        'ASUS Prime series motherboards are expertly engineered to unleash the full potential of 10th and 11th Generation Intel Core processors. Boasting a robust power design, comprehensive cooling solutions and intelligent tuning options, Prime Z590-A provides daily users and DIY PC builders a range of performance tuning options via intuitive software and firmware features. ASUS Prime Z590-A is perfect for those seeking to create a sleek, futuristic-looking build, thanks to its black and white finish and iridescent metallic nameplate and PCB cover.',
      image: 'https://res.cloudinary.com/dxw7l6liy/image/upload/v1634398406/cloudinary/z590_kyam9h.jpg',
      price: 279.99,
      quantity: 100
    },
    {
      name: 'AMD Ryzen 5 5600X Vermeer 3.7GHz 6-Core AM4 Boxed Processor with Wraith Stealth Cooler',
      category: categories[2]._id,
      description:
        'Get the high-speed gaming performance of the world\'s best desktop processor. Encode faster. Render faster. Iterate faster. Create more, faster with AMD Ryzen processor.',
      image: 'https://res.cloudinary.com/dxw7l6liy/image/upload/v1634398406/cloudinary/ryzen5_a7o8db.jpg',
      price: 269.99,
      quantity: 30
    },
    {
      name: 'Intel Core i7-10700K Comet Lake 3.8GHz Eight-Core LGA 1200 Boxed Processor',
      category: categories[2]._id,
      description:
        '10th Gen Intel Core i7-10700K unlocked desktop processor. Featuring Intel Turbo Boost Max Technology 3.0, unlocked 10th Gen Intel Core desktop processors are optimized for enthusiast gamers and serious creators and help deliver high performance overclocking for an added boost. Thermal solution NOT included in the box.',
      image: 'https://res.cloudinary.com/dxw7l6liy/image/upload/v1634398405/cloudinary/intelI7_lmogzs.jpg',
      price: 199.99,
      quantity: 30
    },
    {
      name: 'PowerColor AMD Radeon RX 6700 XT Red Devil Triple-Fan 12GB GDDR6 PCIe 4.0 Graphics Card',
      category: categories[3]._id,
      description:
        'Introducing AMD Radeon RX 6700 XT graphics cards, featuring the breakthrough AMD RDNA 2 architecture. Engineered to deliver the ultimate 1440p gaming experience, the AMD Radeon RX 6700 XT powers a new generation of gaming with vivid visuals and elevated experiences.',
      image: 'https://res.cloudinary.com/dxw7l6liy/image/upload/v1634398406/cloudinary/rx6700_edxsnt.jpg',
      price: 879.99,
      quantity: 100
    },
    {
      name: 'ASUS GeForce RTX 2060 Dual Overclocked Dual-Fan 6GB GDDR6 PCIe 3.0 Graphics Card',
      category: categories[3]._id,
      description: 'Delivering the latest NVIDIA Turing gaming experience in its purest form, the ASUS Dual GeForce RTX 2060 EVO melds performance and simplicity like no other. Leveraging advanced cooling technologies derived from flagship graphics cards, the Dual GeForce RTX 2060 opts for substance over style, the perfect choice for a well-balanced build. Buckle up and engage cutting-edge gaming prowess.',
      image: 'https://res.cloudinary.com/dxw7l6liy/image/upload/v1634398405/cloudinary/asus2060_saoljx.jpg',
      price: 439.99,
      quantity: 1000
    },
    {
      name: 'Lian Li Lancool II Tempered Glass eATX Full Tower Computer Case - Black',
      category: categories[4]._id,
      description:
        'The ultimate chassis for beginners and enthusiasts alike. Strong and durable construction. Optimized cooling support. Quick and easy cable management. Flip panels and shrouds all around. Tool-less RGB front panel. Easy access to hard drive installation.',
      image: 'https://res.cloudinary.com/dxw7l6liy/image/upload/v1634398405/cloudinary/lian_rpcuqw.jpg',
      price: 109.99,
      quantity: 1000
    },
    {
      name: 'Corsair 4000D Airflow Tempered Glass ATX Mid-Tower Computer Case - Black',
      category: categories[4]._id,
      description:
        'The CORSAIR 4000D AIRFLOW is a mid-tower ATX case with easy cable management and exceptional cooling. A steel front panel offers optimal airflow to your components, accompanied by two included 120mm AirGuide fans designed with anti-vortex vanes that enhance cooling. The CORSAIR RapidRoute cable management system makes it effortless to route major cables through a single channel, with 25mm of routing depth. The 4000D AIRFLOW offers all the space you need for excellent cooling and storage, with room for radiators in sizes up to 360mm and four storage drives. Complete with a modern front I/O panel including a USB-C port, the 4000D AIRFLOW makes great cooling and clean looks easier than ever.',
      image: 'https://res.cloudinary.com/dxw7l6liy/image/upload/v1634398405/cloudinary/corsair_yfe5op.jpg',
      price: 104.99,
      quantity: 100
    },
    {
      name: 'EVGA SuperNOVA 850 GA 850 Watt 80 Plus Gold ATX Fully Modular Power Supply',
      category: categories[5]._id,
      description:
        'Introducing the EVGA SuperNOVA GA Series of power supplies - the newest addition to the outstanding line of EVGA Power Supplies. Featuring 80 Plus Gold certification, 100% Japanese capacitors, a durable double-ball bearing fan, and a fully modular design, this power supply is built for long-term usage and durability. Building upon EVGA\'s line of 80 Plus Gold rated power supplies, the EVGA GA Series combines all these features at a great price.',
      image: 'https://res.cloudinary.com/dxw7l6liy/image/upload/v1634398406/cloudinary/supernova_lmlkq7.jpg',
      price: 139.99,
      quantity: 600
    },
    {
      name: 'Seasonic USA FOCUS GX-850, 850W 80+ Gold, Full-Modular, Fan Control in Fanless, Silent, and Cooling Mode, 10 Year Warranty, Perfect Power Supply for Gaming and Various Application, SSR-850FX.',
      category: categories[5]._id,
      description:
        'The newly upgraded FOCUS GX series is the successor to the FOCUS PLUS Series in 80 PLUS Gold efficiency ratings, which became an instant the top seller in the power supply market after its launch, Seasonic engineers have made improvements on the popular series, removing the inline capacitors on the supplied cables. Besides the small change in the series naming, the PSU housing and its packaging are also updated to be in line with the concept of the OneSeasonic Initiative. Seasonic implements modern design and shows outstanding electrical performance with our new FOCUS GX.',
      image: 'https://res.cloudinary.com/dxw7l6liy/image/upload/v1634398406/cloudinary/seasonic_dza1dp.jpg',
      price: 159.99,
      quantity: 600
    },
    {
      name: 'Samsung 980 Pro SSD 1TB M.2 NVMe Interface PCIe Gen 4x4 Internal Solid State Drive with V-NAND 3 bit MLC Technology (MZ-V8P1T0B)',
      category: categories[6]._id,
      description:
        'Unleash the power of the Samsung 980 PRO PCIe 4.0 NVMe SSD for next-level computing. 980 PRO delivers 2x the data transfer rate of PCIe 3.0, while maintaining compatibility with PCIe 3.0.',
      image: 'https://res.cloudinary.com/dxw7l6liy/image/upload/v1634398406/cloudinary/pro980_xfnkqz.jpg',
      price: 189.99,
      quantity: 600
    },
    {
      name: 'Samsung 870 QVO 2TB SSD 4-bit MLC V-NAND SATA III 6Gb/s 2.5" Internal Solid State Drive',
      category: categories[6]._id,
      description:
        'Optimal Sequential Read/Write performance reaching up to 560/530 MB/s provides best in class performance via the SATA interface. Improved Random Read performance up to 15% gives users more benefits for everyday computing. Proven Reliability 870 QVO provides a sufficient amount of TBW for daily use, equivalent to 3 bit MLC SSDs, and offers up to 720 TBW guaranteed endurance. First and highest for client SSD in 2.5 7mm form factor.',
      image: 'https://res.cloudinary.com/dxw7l6liy/image/upload/v1634398406/cloudinary/qvo870_y3blzn.jpg',
      price: 169.99,
      quantity: 600
    },
    {
      name: 'Crucial Ballistix Gaming 16GB (2 x 8GB) DDR4-3600 PC4-28800 CL16 Dual Channel Desktop Memory Kit BL2K8G36C16U4B - Black',
      category: categories[7]._id,
      description:
        'Crucial Ballistix gaming memory is designed for high-performance overclocking and is ideal for gamers and performance enthusiasts looking to push beyond standard limits. With hundreds of awards, multiple esport championships, and numerous overclocking world records under its belt, Crucial Ballistix sets the standard for performance.',
      image: 'https://res.cloudinary.com/dxw7l6liy/image/upload/v1634398405/cloudinary/ballistix_h5hsrp.jpg',
      price: 69.99,
      quantity: 600
    },
    {
      name: 'G.Skill Ripjaws V 16GB (2 x 8GB) DDR4-3200 PC4-25600 CL16 Dual Channel Desktop Memory Kit F4-3200C16D-16GVKB - Black',
      category: categories[7]._id,
      description:
        'High performance dual-channel DDR4 memory designed for maximum compatibility and cutting-edge performance with the latest Intel Core processors. Built with the finest components, tested under the most rigorous conditions, the 16GB 3200MHz Kit is the perfect choice for building a new performance system or for a simple memory upgrade.',
      image: 'https://res.cloudinary.com/dxw7l6liy/image/upload/v1634398406/cloudinary/ripjaws_jfuiuo.jpg',
      price: 69.99,
      quantity: 600
    },
    {
      name: 'Dell SE2422H 23.8" FHD (1920 x 1080) 75Hz HDMI VGA FreeSync Flicker-free LED Monitor',
      category: categories[8]._id,
      description:
        'Enjoy the view on this 23.8 slim-bezel Full HD display featuring AMD FreeSync, fast response time and 75Hz refresh rate for leisure gaming.',
      image: 'https://res.cloudinary.com/dxw7l6liy/image/upload/v1634398406/cloudinary/se2422_qmsbz9.jpg',
      price: 149.99,
      quantity: 600
    },
    {
      name: 'ASUS VP248QG 24" FHD (1920 x 1080) 75Hz HDMI VGA DP FreeSync Eye Care LED Monitor',
      category: categories[8]._id,
      description:
        'The 24 Full HD (1920x1080) ASUS VP248QG delivers the speed you need, built with 1ms response time and Adaptive Sync/FreeSync for tear-free game play with 75Hz refresh rate. ASUS-exclusive Eye Care technology helps to reduce eyestrain and ailments with flicker-free backlighting and various levels of blue light filters.',
      image: 'https://res.cloudinary.com/dxw7l6liy/image/upload/v1634398406/cloudinary/vp248_lwk80f.jpg',
      price: 159.99,
      quantity: 600
    }
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Cameron',
    lastName: 'Cardinale',
    email: 'ccardinale98@gmail.com',
    password: 'password12345',
    orders: [
      {
        products: []
      }
    ]
  });

  console.log('users seeded');

  process.exit();
});
