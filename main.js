"use strict";

$(() => {

  /* sticky menu on scroll */
  $(window).trigger('scroll');
  $(window).bind('scroll', function () {
    let pixels = 300; //number of pixels before modifying styles
    if ($(window).scrollTop() > pixels) {
      $('#main-navigation').addClass('fixed');
    } else {
      $('#main-navigation').removeClass('fixed');
    }
  });


  /* open modal if cart clicked on 
  This will need to open to just the items in the cart
  Maybe even say "nothing in the cart" when no items are in there*/
  
  let cartArray = [];
  $('#open-cart-button').on('click', () => {
    $('#information').empty();
    $(`#information`).append(cartArray);
    $('#modal-container').show();
  });

  //This is to set up the classes
  class category {
    constructor(name, price, description) {
      this.name = name;
      this.price = price;
      this.description = description;
    }
  }

  //MASSAGES class
  class massage extends category {
    constructor(name, price, description) {
      super(name, price, description);
    }
  }
  let traditional = new massage("Traditional", 50, "Melt stress and soothe muscles with our classic Swedish technique. Long, sweeping strokes and kneading are used across multiple focus areas, promoting circulation and well-being.");
  let deepTissue = new massage("Specialty", 70, "Our deeply corrective massage releases muscle tension and toxins from the body. Our specialists will help to relieve pain and discomfort in congested areas within muscles, tendons and ligaments due to stress, injury, or overuse to restore proper range of motion, leaving your body in a state of relaxation and gratitude.")
  let hotStone = new massage("Hotstone", 80, "Experience the deepest form of relaxation with our hot stone massage therapy. Your muscles will melt under warm basalt river stones that deeply penetrate tense muscles, releasing toxins. restore balance to your body and leave feeling calmer, more relaxed and stress-free.")
  let sports = new massage("Sports", 70, "Great for the active and the serious athlete. A customized massage to soothe strained muscle groups. Massage combined with stretching and deep kneading eases tension in tight muscles, stimulating healing and improving recovery time from intensive training and long, stressful days.")

  //FACIALS class
  class facial extends category {
    constructor(name, price, description) {
      super(name, price, description);
    }
  }
  let signature = new facial("Signature", 20, "A relaxing facial that includes all natural products: a cleanser, an exfoliate, light peel mask, and moisturizer customized to your skin type.")
  let exfoliating = new facial("Exfoliating", 25, "A hydrating facial designed to nourish your skin on a deeper level: a cream wash, then exfoliate. The exfoliation process helps stimulate new skin cells, revealing beautiful, young-looking skin. An Agave Nectar Oil steaming compress plumps the look of your skin with a special blend of hydrating extracts, and giving you an incredible, light youthful glow.")
  let illuminating = new facial("Illuminating", 25, "A multi-active, vitamin-enriched treatment. The esthetician will select specific products to rebalance the skin concerns: sensitive, oily/blemished, dull/lifeless, and correct initial and advanced signs of aging.")

  //Body Work class
  class bodyWork extends category {
    constructor(name, price, description) {
      super(name, price, description);
    }
  }
  let balancing = new bodyWork("Balancing", 100, "Relax and reveal more youthful, balanced skin with our detoxifying Balancing Body Wrap. Kaolin clay gently detoxifies and cleanses skin as it stimulates circulation. Israeli Dead Sea salt, a natural exfoliant rich in minerals, nourishes skin while nutrient-rich sea kelp draws out toxins and impurities. With vegetable-based glycerin and aloe, this wrap draws moisture into the skin to heal and condition. Antioxidant-rich orange peel, orange and pink grapefruit oils ease inflammation, increase collagen production, and cleanse and tone. De-stress and detoxify with Balance Body Wrap.")
  let brightening = new bodyWork("Brightening", 120, "Experience the intoxicating scents of lime, peppermint and coconut as this tropical-inspired wrap tones and detoxifies the body. Its kaolin clay base stimulates circulation and draws impurities from the skin as aloe vera and glycerin retain moisture. This wrap helps reduce hyperpigmentation while vitamin C (an antioxidant necessary for the production of collagen) firms and brightens skin. As raw organic coconut hydrates, peppermint leaves reduce inflammation and awaken the senses. Let your cares drift away as you relax and let our Brightening Body Wrap renew your dull, tired skin.")
  let clarifying = new bodyWork("Clarifying", 120, "Experience revitalized, clearer skin with Clarifying Body Wrap. Moroccan Lava clay and sea clay draw out toxins and remove impurities while adding vital minerals to skin. With vegetable-based glycerin and aloe, this wrap draws moisture into the skin to heal and condition. The antiseptic and anti-inflammatory properties of peppermint, spearmint, thyme, and nettle leaf work together to help improve skin’s clarity. Clarifying Body Wrap also helps protect against free radical damage with vitamin E-rich organic sunflower seed oil. Nourish and refresh your skin with this detoxifying, reviving treatment.")
  let hydrating = new bodyWork("Hydrating", 100, "Unscented Aloe Vera Hydrating Gel Body Wrap is paraben and formaldehyde free—and it’s vegan. Like Shea Butter Sugar Scrub, it comes off easily with steamed towels. Made with aloe leaf juice and glycerin, it hydrates and heals dry, stressed skin. This scent-free product is perect for spa guests who are sensitive to fragrances.")

  //Manicures and Pedicures class
  class maniPedi extends category {
    constructor(name, price, description) {
      super(name, price, description);
    }
  }
  let manicure = new maniPedi("Manicure", 20, "Hand soak, nail trimming and cleaning, hand moisturizing, hand massage, and polish.")
  let pedicure = new maniPedi("Pedicure", 30, "Foot soak, nail trimming and cleaning, foot moisturizing, foot massage, and polish.")
  let manicurePedicure = new maniPedi("Mani-Pedi", 45, "Hand and foot soak, finger and toe nail trimming and cleaning, hand and foot moisturizing, hand and foot massage, and finger and toe nail polish.")


  // This is an array of objects
  const servicesList = {
    'Massage': [traditional, deepTissue, hotStone, sports],
    'Facial': [signature, exfoliating, illuminating],
    'Body Work': [balancing, brightening, clarifying, hydrating],
    'Mani / Pedi': [manicure, pedicure, manicurePedicure]
  };

  /* this function shows the modal where all the fun stuff will happen */
  let showModal = (serviceId) => {
    let modalContainer = $('#modal-container');
    modalContainer.show();
  }

  /* close modal */
  $('#close-button').on('click', () => {
    $('#modal-container').hide();
  });

  /* this sets up listeners for when the user clicks on services */
  let services = $('#services').children();
  console.log({services});
  console.log(`${services}`);
  let serviceId;

  //for all these html elements when they get clicked on do the following 
  $(services).on('click', (event) => {
    // Make an array of all the cool objets you've set up for each service type
    // Loop through array to find the object you want
    // Pull out that object's info!

    console.log("The event target's text:", $(event.target).text());
    let serviceTitle = $(event.target).text();

    const data = servicesList[serviceTitle];

    console.log("service data:", data, serviceTitle);

    // Clear the information box
    $('#information').empty();

    // Populate the information box
    for (let info of data) {
      $('#information')
        .append(
          $(`<h4/>`)
            .addClass("info-name")
            .html(`${info.name}`)
        );

      $('#information').append(
        $(`<h5/>`)
          .addClass("info-price")
          .html(`$${info.price}`)
      );

      $('#information').append(`${info.description}`);

      $(`#information`).append(`<br><br><button class="button-next" id="${info.name}"> Add to Cart </button>`);     
     
      $(`#${info.name}`).on('click', function() {
        console.log(`${info.name}`);
        cartArray.push(info.name);
        cartArray.push(info.price);
      })
    }

    // serviceId = `#${event.target.id}`;
    showModal(serviceId);

  });
});