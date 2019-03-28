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
  $('#open-cart-button').on('click', () => {
    $('#modal-container').show();
  });

  //This is to set up the classes
  class Service {
    constructor(name, price, description) {
      this.name = name;
      this.price = price;
      this.description = description;
    }
  }

  //MASSAGES
  class massage extends Service {
    constructor(name, price, description) {
      super(name, price, description);
    }
  }
  let traditional = new massage("Traditional", "$50", "Melt stress and soothe muscles with our classic Swedish technique. Long, sweeping strokes and kneading are used across multiple focus areas, promoting circulation and well-being.");
  let deepTissue = new massage("Deep Tissue", "$70", "Our deeply corrective massage releases muscle tension and toxins from the body. Our specialists will help to relieve pain and discomfort in congested areas within muscles, tendons and ligaments due to stress, injury, or overuse to restore proper range of motion, leaving your body in a state of relaxation and gratitude.")
  let hotStone = new massage("Hot Stone", "$80", "Experience the deepest form of relaxation with our hot stone massage therapy. Your muscles will melt under warm basalt river stones that deeply penetrate tense muscles, releasing toxins. restore balance to your body and leave feeling calmer, more relaxed and stress-free.")
  let sports = new massage("Sports", "$70", "Great for the active and the serious athlete. A customized massage to soothe strained muscle groups. Massage combined with stretching and deep kneading eases tension in tight muscles, stimulating healing and improving recovery time from intensive training and long, stressful days.")

  //FACIALS
  class facial extends Service {
    constructor(name, price, description) {
      super(name, price, description);
    }
  }
  let signature = new facial("Signature", "$20", "A relaxing facial that includes all natural products: a cleanser, an exfoliate, light peel mask, and moisturizer customized to your skin type.")
  let exfoliating = new facial("Exfoliating", "$25", "A hydrating facial designed to nourish your skin on a deeper level: a cream wash, then exfoliate. The exfoliation process helps stimulate new skin cells, revealing beautiful, young-looking skin. An Agave Nectar Oil steaming compress plumps the look of your skin with a special blend of hydrating extracts, and giving you an incredible, light youthful glow.")
  let illuminating = new facial("Illuminating", "$25", "A multi-active, vitamin-enriched treatment. The esthetician will select specific products to rebalance the skin concerns: sensitive, oily/blemished, dull/lifeless, and correct initial and advanced signs of aging.")

  //Body Work
  class bodyWork extends Service {
    constructor(name, price, description) {
      super(name, price, description);
    }
  }
  let balancing = new bodyWork("Balancing", "$100", "Relax and reveal more youthful, balanced skin with our detoxifying Balancing Body Wrap. Kaolin clay gently detoxifies and cleanses skin as it stimulates circulation. Israeli Dead Sea salt, a natural exfoliant rich in minerals, nourishes skin while nutrient-rich sea kelp draws out toxins and impurities. With vegetable-based glycerin and aloe, this wrap draws moisture into the skin to heal and condition. Antioxidant-rich orange peel, orange and pink grapefruit oils ease inflammation, increase collagen production, and cleanse and tone. De-stress and detoxify with Balance Body Wrap.")
  let brightening = new bodyWork("Brightening", "$120", "Experience the intoxicating scents of lime, peppermint and coconut as this tropical-inspired wrap tones and detoxifies the body. Its kaolin clay base stimulates circulation and draws impurities from the skin as aloe vera and glycerin retain moisture. This wrap helps reduce hyperpigmentation while vitamin C (an antioxidant necessary for the production of collagen) firms and brightens skin. As raw organic coconut hydrates, peppermint leaves reduce inflammation and awaken the senses. Let your cares drift away as you relax and let our Brightening Body Wrap renew your dull, tired skin.")
  let clarifying = new bodyWork("Clarifying", "120", "Experience revitalized, clearer skin with Clarifying Body Wrap. Moroccan Lava clay and sea clay draw out toxins and remove impurities while adding vital minerals to skin. With vegetable-based glycerin and aloe, this wrap draws moisture into the skin to heal and condition. The antiseptic and anti-inflammatory properties of peppermint, spearmint, thyme, and nettle leaf work together to help improve skin’s clarity. Clarifying Body Wrap also helps protect against free radical damage with vitamin E-rich organic sunflower seed oil. Nourish and refresh your skin with this detoxifying, reviving treatment.")
  let hydrating = new bodyWork("Hydrating", "100", "Unscented Aloe Vera Hydrating Gel Body Wrap is paraben and formaldehyde free—and it’s vegan. Like Shea Butter Sugar Scrub, it comes off easily with steamed towels. Made with aloe leaf juice and glycerin, it hydrates and heals dry, stressed skin. This scent-free product is perect for spa guests who are sensitive to fragrances.")

  //Manicures and Pedicures
  class maniPedi extends Service {
    constructor(name, price, description) {
      super(name, price, description);
    }
  }

  let manicure = new maniPedi("Manicure", "$20", "Hand soak, nail trimming and cleaning, hand moisturizing, hand massage, and polish.")
  let pedicure = new maniPedi("Pedicure", "$30", "Foot soak, nail trimming and cleaning, foot moisturizing, foot massage, and polish.")
  let manicurePedicure = new maniPedi("Mani/Pedi", "$45", "Hand and foot soak, finger and toe nail trimming and cleaning, hand and foot moisturizing, hand and foot massage, and finger and toe nail polish.")


  // This is an array of objects
  const servicesArray = [
    {
      name: 'massage',
      data: [traditional, deepTissue, hotStone, sports]
    },

    {
      name: 'facial',
      data: [signature, exfoliating, illuminating]
    },

    {
      name: 'bodyWork',
      data: [balancing, brightening, clarifying, hydrating]
    },

    {
      name: 'maniPedi',
      data: [manicure, pedicure, manicurePedicure]
    }

  ];

  /* this function shows the modal where all the fun stuff will happen */
  let showModal = (serviceId) => {
    let modalContainer = $('#modal-container');
    modalContainer.show();

    let showService = serviceId;

    // console.log('How to access service array: ', servicesArray[0].data);
  }

  /* close modal */
  $('#close-button').on('click', () => {
    $('#modal-container').hide();
  });

  /* this sets up listeners for when the user clicks on services */
  let services = $('#services').children();
  let serviceId = '';

  $(services).on('click', (event) => {
    // Make an array of all the cool objets you've set up for each service type
    // Loop through array to find the object you want
    // Pull out that object's info!

    console.log("The event target's text:", $(event.target).text());
    let serviceTitle = $(event.target).text();


    // Loop goes here
    for (let service of servicesArray) {
      //This is where the service will be chosen

      console.log('Service category:', service.name);
      // console.log('Service data:', service.data);
      for( let data of service.data) {
        console.log('Service name:', data.name);
        console.log('Service price:', data.price);
        console.log('Service description:', data.description);
      }
    }

    //This if statement matches the logic. 
    //This is setting up the html. right now it is hardcoded 
    if (serviceTitle === 'Mani/Pedi') {
      $('#information').text(manicure.description)
    }
    serviceId = `#${event.target.id}`;
    showModal(serviceId);

    //This is the empty array for the reciept
    const recieptArray = [];


  /* test stuff for the steps in the process... this can be moved safely with a copy and paste */

  /* this will eventually help with making the template for the receipt page */

  let receiptHTML = 
  `<div class="invoice-box">
  <table cellpadding="0" cellspacing="0">
      <tr class="top">
          <td colspan="2">
              <table>
                  <tr>
                      <td class="title">
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
      
      <tr class="information">
          <td colspan="2">
              <table>
                  <tr>
                      <td>
                          Lily's Spa, LLC.<br>
                          2900 Grandville<br>
                          Grand Rapids, MI 49519
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
      
      <tr class="heading">
          <td>
              Payment Method
          </td>
          
          <td>
              Credit Card/ Debit Card
          </td>
      </tr>
      <tr class="heading">
          <td>
              Item
          </td>
          
          <td>
              Price
          </td>
      </tr>
      
      <tr class="item">
          <td>
             Body Masage
          </td>
          
          <td>
              $300.00
          </td>
      </tr>
      <tr class="item">
          <td>
              Manicure
          </td>
          
          <td>
              $75.00
          </td>
      </tr>
      
      <tr class="item last">
          <td>
              Pedicure
          </td>
          
          <td>
              $10.00
          </td>
      </tr>
      
      <tr class="total">
          <td></td>
          
          <td>
             Total: $385.00
          </td>
      </tr>
  </table>
</div>`;

    
    /* this will eventually help with making the template for the checkout page */

    let checkoutHTML = `
    <div class="checkout-panel">
    <div class="panel-body">
      <h2 class="title">Checkout</h2>
      <div class="payment-method">
        <label for="card" class="method card">
          <div class="card-logos">
          </div>

          <div class="Payment-method-two">
              <label for="card" class="cash">
              </div>
          <div class="radio-input">
            <input id="card" type="radio" name="payment">
            Pay 340.00 with credit card
            </div>
            </label>
          </div>
   
      <div class="input-fields">
        <div class="column-1">
          <label for="cardholder">Cardholder's Name</label>
          <input type="text" id="cardholder" />
   
          <div class="small-inputs">
            <div>
              <label for="date">Valid thru</label>
              <input type="text" id="date" placeholder="MM / YY" />
            </div>
   
            <div>
              <label for="verification">CVV / CVC *</label>
              <input type="password" id="verification"/>
            </div>
          </div>
        </div>
        <div class="column-2">
          <label for="cardnumber">Card Number</label>
          <input type="password" id="cardnumber"/>
          <span class="info">* CVV or CVC is the card security code, unique three digits number on the back of your card separate from its number.</span>
        </div>
      </div>
    </div>
   
    <div class="panel-footer">
      <button class="btn back-btn">Back</button>
      <button class="btn next-btn">Next Step</button>
    </div>
  </div>`;

  let paymentProcessing = (checkoutHTML) => {
    console.log('call to the payment processing function');
    console.log(`checkout html in payment processor: ${checkoutHTML}`);
    $('#modal-html-holder').html(checkoutHTML);
    //console.log(checkoutHTML);
  }

  let testOfPayment = paymentProcessing(checkoutHTML);
  console.log(testOfPayment);

  // console.log(checkoutHTML);

  /* test listener to insert Receipt HTML */
    $('#show-receipt').on('click', () => {
      $('#modal-html-holder').html(receiptHTML);
      $('#modal-services-menu').hide();
    });

  /* test listener to insert checkout HTML */
    $('#show-checkout').on('click', {msg: checkoutHTML}, (event) => {
      // console.log(`this is event: ${event}`);
      // console.log(`this is checkoutHTML in listener: ${checkoutHTML}`);
      $('#modal-html-holder').text('');
      paymentProcessing(checkoutHTML);
      $('#modal-services-menu').hide();
    });

  });
});