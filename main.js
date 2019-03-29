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

  /* this array holds the contents of the cart */
  let cartArray = [];

  /* this is holding the sub total */
  let subTotalDisplay = 0;

  /* this function updates the cart contents on call */

  function updateCartCount () {
    let cartContentsCount = cartArray.length;
    // only display cart contents if an item has been purchased
    if (cartContentsCount > 0) {
      $('#cart-contents').show();
      $('#show-number-cart-items').text(cartContentsCount);
      $('#show-number-cart-items-main').text(cartContentsCount);
    }
  }


  /* this function shows the contents of the cart */

  let showCartContents = (cartArray) => {
    console.log(`SHOW CART CONTENTS CALLED SUCCESSFULLY`);
    console.log(`This is the cartArray in showCartContents: ${cartArray}`);

    let htmlCartHeader = `
    <div class="invoice-box">
  <table cellpadding="0" cellspacing="0">    
      <tr class="heading" id="html-table-start">
          <td>
              Item
          </td>
          
          <td>
              Price
          </td>
      </tr>`;
    $('#modal-html-holder').html(htmlCartHeader);

   


    for (let key in cartArray) {
      let lastItem = parseInt(key) + 1;
      if (lastItem === cartArray.length) {
        console.log('this is the last item');
        let htmlItemDisplay = `
        <tr class="item" id="last-item-in-table"><td>${cartArray[key].name}</td><td>$${cartArray[key].price}.00</td></tr>`;
        $('#html-table-start').after(htmlItemDisplay);
      } else {
        let htmlItemDisplay = `
        <tr class="item"><td>${cartArray[key].name}</td><td>$${cartArray[key].price}.00</td></tr>`;
        $('#html-table-start').after(htmlItemDisplay);
      }
      
      subTotalDisplay = subTotalDisplay + cartArray[key].price;  
    }
    
    console.log(`sub total: ${subTotalDisplay}`);
    
    // calculate taxes
    let taxes = subTotalDisplay * 1.06;
    console.log(`total after taxes: ${taxes}`);

    let htmlCartFooter = `
    <tr class="total">
    <td></td>
    
    <td>
       Sub-Total: $385.00
    </td>
</tr>
<tr class="total">
<td></td>

<td>
   Taxes: $23.10
</td>
</tr>
<tr class="total">
<td></td>

<td>
 Total: $408.10
</td>
</tr>
</table>
</div>`;

  }



  /* this is listening to open the cart when clicked on  */

  $('#open-cart-button, #cart-contents').on('click', () => {
    $('#checkout-flow-title').text('Your Cart');
    $('#information').empty();
    $('#information').text(cartArray);
    //for each item in the cart array use the for of loop
    //in the loop, append the name and price to #information
    //you will replace line 35
    $('#modal-container').show();
    updateCartCount();
    // console.log(`This is cart array in open cart function: ${cartArray}`);
    if (cartArray.length > 0) {
      showCartContents(cartArray);
    } else {
      // console.log(`CART IS EMPTY YO!@#!`);
    }
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
  // console.log({ services });
  console.log(`this is what services is: ${services}`);
  let serviceId;

  //for all these html elements when they get clicked on do the following 

  $(services).on('click', (event) => {
    // Make an array of all the cool objets you've set up for each service type
    // Loop through array to find the object you want
    // Pull out that object's info!

    $('#checkout-flow-title').text('Book A Service');

    console.log("The event target's text:", $(event.target).text());
    let serviceTitle = $(event.target).text();

    console.log(`this is the service title clicked on: ${serviceTitle}`);

    console.log(`services title object: ${servicesList[serviceTitle]}`);
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

      $(`#${info.name}`).on('click', function () {
        console.log(`${info.name}`);
        cartArray.push({name: info.name, price: info.price});
        // cartArray.push(info.price);
        updateCartCount();
      })
    }
 
    // serviceId = `#${event.target.id}`;
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
             Sub-Total: $385.00
          </td>
      </tr>
    <tr class="total">
      <td></td>
      
      <td>
         Taxes: $23.10
      </td>
    </tr>
    <tr class="total">
    <td></td>
    
    <td>
       Total: $408.10
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
        <div class="method card">
          <div class="card-logos">
          </div>

          <div class="Payment-method-two">
              <label for="card" class="cash">
              </div>
          <div class="radio-input">
            <input id="card" type="radio" name="payment">
            Pay 385.00 with credit card
          </div>
          <div class="radio-input">
          <input id="card" type="radio" name="payment">
          Pay 385.00 with cash
        </div>
            </div>
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

    /* simple function to count sales tax, used on receipt */

    const calculateSalesTax = (totalBeforeTaxes) => {
      let totalAfterTaxes = totalBeforeTaxes * 1.06;
      return totalAfterTaxes;
    }


    let paymentProcessing = (checkoutHTML) => {
      console.log('call to the payment processing function');
      // console.log(`checkout html in payment processor: ${checkoutHTML}`);
      $('#modal-html-holder').html(checkoutHTML);

      //console.log(checkoutHTML);
    }

    // let testOfPayment = paymentProcessing(checkoutHTML);
    // console.log(testOfPayment);

    // console.log(checkoutHTML);

    /* test listener to insert Receipt HTML */
    $('#show-receipt').on('click', () => {
      $('#information').empty();
      $('#modal-html-holder').html(receiptHTML);
      $('#modal-services-menu').hide();
    });

    /* test listener to insert checkout HTML */
    $('#show-checkout').on('click', { msg: checkoutHTML }, (event) => {
      $('#information').empty();
      // console.log(`this is event: ${event}`);
      // console.log(`this is checkoutHTML in listener: ${checkoutHTML}`);
      $('#modal-html-holder').text('');
      paymentProcessing(checkoutHTML);
      $('#modal-services-menu').hide();
    });

    // /* test listener to insert checkout HTML */
    // $('#show-cart').on('click', (event) => {
    //   // console.log(`this is event: ${event}`);
    //   // console.log(`this is checkoutHTML in listener: ${checkoutHTML}`);

    //   // static cart items test //

    //   // let cartContentsCount = 3;
    //   // $('#show-number-cart-items').text(cartContentsCount);
    //   // $('#show-number-cart-items-main').text(cartContentsCount);

    //   // show place holder text //
    //   $('#modal-html-holder').text('');
    //   $('#modal-html-holder').html('<p>this is the review cart placeholder</p>');
    //   $('#modal-services-menu').hide();
    // });

  });
});