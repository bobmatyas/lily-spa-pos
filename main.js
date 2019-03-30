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

  /* simple function to count sales tax, used in cart and on receipt */

  const calculateSalesTax = (totalBeforeTaxes) => {
    let totalAfterTaxes = totalBeforeTaxes * 1.06;
    return totalAfterTaxes;      
  }


  /* this function updates the item count in the cart on call */

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

    /* this sets up a block of html to build the cart template */

    let cartHtmlHeader = `<div class="invoice-box">
      <table cellpadding="0" cellspacing="0">    
        <tr class="information">
          <td colspan="2">
            <table>
                <tr id="cart-payment-info-box">
                  <td>
                      Lily's Spa, LLC.<br>
                      2900 Grandville<br>
                      Grand Rapids, MI 49519
                  </td>
              </tr>
            </table>
          </td>
        </tr>
       <tr class="heading" id="cart-payment-method-display">
          <td>Invoice Status</td>
          <td>PAID</td>
       </tr>  
       <tr class="heading" id="html-table-start">
          <td>Item</td><td>Price</td>
       </tr>`;
   
    let cartHtmlContents = cartHtmlHeader;
    
    /* this loops through the cart and adds to the html template */

    for (let key in cartArray) {
      let lastItem = parseInt(key) + 1;
      if (lastItem === cartArray.length) {
        let htmlItemDisplay = `
        <tr class="item" id="last-item-in-table"><td>${cartArray[key].name}</td><td>$${cartArray[key].price}.00</td></tr>`;
        cartHtmlContents = `${cartHtmlContents}${htmlItemDisplay}`;
      } else {
        let htmlItemDisplay = `
        <tr class="item"><td>${cartArray[key].name}</td><td>$${cartArray[key].price}.00</td></tr>`;
        cartHtmlContents = `${cartHtmlContents}${htmlItemDisplay}`;
      }
      
    }
    
    // calculate taxes
      let totalAfterTaxes = calculateSalesTax(subTotalDisplay);
      let taxes = (subTotalDisplay * .06).toFixed(2);

      /* fix the rounding */

     let totalRounded = totalAfterTaxes.toFixed(2);

    // finish building the html template block 

    let cartHtmlFooter = `
      <tr class="total">
        <td></td> 
        <td>Sub-Total: $${subTotalDisplay}</td>
      </tr>
      <tr class="total">
        <td></td>
        <td>Taxes: $${taxes}</td>
      </tr>
      <tr class="total">
        <td></td>
        <td>Total: $${totalRounded}</td>
      </tr>
    </table>
    </div>`;

    cartHtmlContents = `${cartHtmlContents}${cartHtmlFooter}`;
    
    // and finally, display the html for the cart contents 

    $('#modal-html-holder').html(cartHtmlContents);
  }



  /* this is listening to open the cart when clicked on  */

  $('#open-cart-button, #cart-contents').on('click', () => {
    $('#information').empty();
    $('#checkout-flow-title').text('Your Cart');
    
    //$('#information').text(cartArray);
    //for each item in the cart array use the for of loop
    //in the loop, append the name and price to #information
    //you will replace line 35
    $('#modal-container').show();
    // updateCartCount();
    // console.log(`This is cart array in open cart function: ${cartArray}`);
    if (cartArray.length > 0) {
      $('#cart-contents').show();
      showCartContents(cartArray);
    } else {
      $('#information').addClass('empty-cart-warning').text('Your cart is currently empty.');
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
  $('#close-button, #continue-shopping').on('click', () => {
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
    console.log("The event target's id:", $(event.target).text());
    let serviceTitle = $(event.target).text();
   
    console.log(`this is the service title clicked on: ${serviceTitle}`);

    console.log(`services title object: ${servicesList[serviceTitle]}`);
    const data = servicesList[serviceTitle];

    console.log("service data:", data);

    // Clear the information box
    $('#information').removeClass().empty();

    $('#information')
       .append(
         $(`<h2/>`)
           .html(`${serviceTitle}`)
       );

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

      $(`#${info.name}`).on('click', () => {
        cartArray.push({name: info.name, price: info.price});
        // cartArray.push(info.price);
        subTotalDisplay += info.price;
        updateCartCount();

      showCartContents(cartArray);
      });
    }
    
 
    // serviceId = `#${event.target.id}`;
    showModal(serviceId);

    //This is the empty array for the reciept
    const recieptArray = [];

    let paymentProcessing = (subTotalDisplay) => {

      $('#checkout-flow-title').text('Checkout');

      let totalAfterTaxes = calculateSalesTax(subTotalDisplay);

      /* calculates the current year and adding 5 years to setup a select box for cc expiration */
      
      let currentDate = new Date();
      let startYear = currentDate.getFullYear();
      let yearsSelectBox = `<select id="credit-card-year" name="year"> <option value="${startYear}">${startYear}</option>`;

      for (let i = 0; i <= 5; i++) {
        startYear += 1;
        yearsSelectBox = `${yearsSelectBox}<option value="${startYear}">${startYear}</option>`;
      }

      yearsSelectBox = `${yearsSelectBox}</select>`;

      /* sets up the cc month expiration selection */

      let monthsSelectBox = `<select id="credit-card-month">`;

      for (let i = 1; i <= 12; i++) {
        let paddedMonth = i;
        if (i < 10) {
          paddedMonth = `0${i}`;
        }
        monthsSelectBox = `${monthsSelectBox}<option>${paddedMonth}</option>`;
      }

      monthsSelectBox = `${monthsSelectBox}</select>`;


      /* creates the checkout html template */

      let checkoutHTML = `
      <div class="checkout-panel">
      <div class="panel-body">
        <h2 class="title">Payment Information</h2>
        <div class="payment-method">
          <div class="method card">
            <div class="card-logos">
            </div>

            <div class="radio-input" id="pay-with-card">
              Pay ${totalAfterTaxes.toFixed(2)} with credit card
            </div>
            <div class="radio-input" id="pay-with-cash">
              Pay ${totalAfterTaxes.toFixed(2)} with cash
            </div>
          </div>
        </div>
        <div class="input-fields" id="pay-with-card-input-fields">
          <div class="column-1">
            <label for="cardholder">Cardholder's Name</label>
            <input type="text" id="cardholder" />
     
            <div class="small-inputs">
              <div>
                <label for="date">Valid thru (MM / YY)</label>
                  ${monthsSelectBox}
                  ${yearsSelectBox}
              </div>
     
              <div>
                <label for="verification">CVV / CVC *</label>
                <input type="number" min="3" max="3" id="verification"/>
              </div>
            </div>
          </div>
          <div class="column-2">
            <label for="cardnumber">Card Number</label>
            <input type="password" id="cardnumber" max="16"/>
          </div>
          <button class="button-next">Add Card</button>
        </div>
      </div>
      <div class="input-fields" id="pay-with-cash-input-fields">
        <p>Cash Amount Due: $<span id = "amount-holder"> ${totalAfterTaxes.toFixed(2)} </span></p>
        <div id="pay-with-cash-calculator">
          <div>
            <input type="number" id="pay-with-cash-how-much-paying" />
          </div>
          <div id="pay-with-cash-calculator-change">
            <p id="how-much-paying"></p>
          </div>
        </div>
      </div>
      <div class="panel-footer">
        <button class="btn next-btn" id="finish-transaction">PAY</button>
      </div>
    </div>`;
      
    
    console.log('call to the payment processing function');
    
    //console.log(`checkout html in payment processor: ${checkoutHTML}`);
      $('#modal-html-holder').html(checkoutHTML);

      $('#continue-shopping').hide();

      $('#pay-with-card').on('click', () => {
        $('#pay-with-cash-input-fields').hide();
        $('.method').hide();
        $('#pay-with-card-input-fields').show();
      });

      $('#cardnumber').change(() => {
        $("#show-receipt").show();

      }); 

      $('#pay-with-cash').on('click', () => {
        $('#pay-with-card-input-fields').hide();
        $('.method').hide();
        $('#pay-with-cash-input-fields').show();
      });

      $("#pay-with-cash-how-much-paying").change( { msg: totalAfterTaxes }, (event) => {

        // change will listen to box, 
        // see if payment is sufficient
        // give change or say isn't sufficient

        console.log(`taxes in cash payment: ${totalAfterTaxes}`);
        let contentToInsert = $('#pay-with-cash-how-much-paying').val();
        
        // add decimals to total
        
        let decimalTotal = totalAfterTaxes.toFixed(2);
        console.log(`taxes w/decimal: ${decimalTotal}`);


        if (contentToInsert == totalAfterTaxes) {
          $('#how-much-paying').text(`Thank you for your anticipated payment of ${contentToInsert}. Please proceed to the receipt page.`);
          $('#show-receipt').show();
        } else if (contentToInsert <= totalAfterTaxes) {
          $('#how-much-paying').text('Please enter enough to pay your bill.');
        } else if (contentToInsert > totalAfterTaxes) {
          $('#show-receipt').show();
          let changeDue = contentToInsert - decimalTotal;
          $('#how-much-paying').text(`Your change is $${changeDue.toFixed(2)}.`);
          console.log(`change due: ${changeDue}`);
          calculateChangeDue(contentToInsert, changeDue, decimalTotal);
        }
       });

    }



    /* test listener to insert Receipt HTML */
    $('#show-receipt').on('click', () => {
      // $('#information').empty();
      $('#checkout-flow-title').text('Your Receipt');
      $('#cart-contents').hide();
      //$('#modal-html-holder').html(receiptHTML);
      showCartContents(cartArray);
      $('#cart-payment-info-box, #cart-payment-method-display').show();
      $('#modal-services-menu').hide();
      $('#show-receipt').hide();
      $('#finish').show();

        // .append('<button id="finish" class="button-next">Finish</button>');

    });

    $('#finish').on('click', () => {
      console.log("Is this working?")
      location.reload();
    });

    /* test listener to insert checkout HTML */
    // $('#show-checkout').on('click', { msg: checkoutHTML }, (event) => {
    $('#show-checkout').on('click', (event) => {
      $('#information').empty();
      // console.log(`this is event: ${event}`);
      // console.log(`this is checkoutHTML in listener: ${checkoutHTML}`);
      $('#modal-html-holder').text('');
      paymentProcessing(subTotalDisplay);
      // $('#modal-services-menu').hide();
      $('.information-maincontainer').hide();
      $('#show-checkout').hide();
      $('#cart-contents').hide();
      $('#modal-html-holder').addClass('modal-width100');
      $('#modal-html-holder').removeClass('modal-width40');
      $('#close-button').hide();
      $('.panel-footer').hide();
      $('.container').css('pointer-events', 'none');
    });

    // $('#finish-transaction').on('click', () => {
    //   console.log(`finish transaction clicked on`);
    //   $('#modal-html-holder').text('');
    //   $('#modal-html-holder').text('your transaction is done!');
    // });


    /* this is the calculator for cash back 
    it calculates both the bills and the coins */

    let calculateChangeDue = (amountDue, changeDue, amountTendered) => {
      
      // console.log(`amount due in change function: ${amountTendered}`);
      // console.log(`decimal total in change function: ${amountTendered}`);
      // console.log(`change due in change function: ${changeDue}`);
      
      let roundedChangeAmount = roundTheNumbers(changeDue, 2);

      // console.log(`rounded change to run calculations: ${roundedChangeAmount}`);

      //split number to calculate change
      let integerPart = parseInt(roundedChangeAmount);
      let decimalPart = roundTheNumbers((roundedChangeAmount - integerPart), 2);

      let dollarOverPayment = integerPart;

      let twentys = 0;
      let tens = 0;
      let fives = 0;
      let singles = 0;

      if (dollarOverPayment >= 1) {
        
        // count twenty dollar bills back        
        if ( (dollarOverPayment/20) === 1) {
          twentys = 1;
          dollarOverPayment = dollarOverPayment - 20;
        } else if ( (dollarOverPayment % 20) === 0) {
          let getTwentyCount = dollarOverPayment / 20;
          twentys = getTwentyCount;
          dollarOverPayment -= (getTwentyCount * 20);
        } else if ( (dollarOverPayment / 20) > 1 ) {
          let divisionResult = Math.floor(dollarOverPayment/20);
          twentys = divisionResult;
          dollarOverPayment = dollarOverPayment - (divisionResult * 20);
        }
      
        // count ten dollar bills back        
        if ( (dollarOverPayment/10) === 1) {
          tens = 1;
          dollarOverPayment = dollarOverPayment - 10;
        } else if ( (dollarOverPayment % 10) === 0) {
          let getTensCount = dollarOverPayment / 10;
          tens = getTensCount;
          dollarOverPayment -= (getTensCount * 10);
        } else if ( (dollarOverPayment / 10) > 1 ) {
          let divisionResult = Math.floor(dollarOverPayment/10);
          tens = divisionResult;
          dollarOverPayment = dollarOverPayment - (divisionResult * 10);
        }
      
        // count five dollar bills back        
        if ( (dollarOverPayment/5) === 1) {
          fives = 1;
          dollarOverPayment = dollarOverPayment - 5;
        } else if ( (dollarOverPayment % 5) === 0) {
          let getFivesCount = dollarOverPayment / 5;
          fives = getFivesCount;
          dollarOverPayment -= (getFivesCount * 5);
        } else if ( (dollarOverPayment / 5) > 1 ) {
          let divisionResult = Math.floor(dollarOverPayment/5);
          fives = divisionResult;
          dollarOverPayment = dollarOverPayment - (divisionResult * 5);
        }

        //remainder is all dollars

        singles = dollarOverPayment;   

      }

      console.log(`twentys back: ${twentys}`);
      console.log(`tens back: ${tens}`);
      console.log(`fives back: ${fives}`);
      console.log(`dollars back: ${singles}`);

      // console.log(`dollar amount: ${integerPart}`);
      // console.log(`decimal amount: ${decimalPart}`);

      //convert to 100 to make math easier

      let decimalBase10 = roundTheNumbers((decimalPart * 100), 2);

      console.log(`decimal at 100: ${decimalBase10}`);

      let quarters = 0;
      let dimes = 0;
      let nickels = 0;
      let pennys = 0;
  

      //check if change is due 
      
     let overPayment = decimalBase10;

     if ( (overPayment/25) === 1) {
        quarters = 1;
        overPayment = overPayment - 25;
      } else if ( (overPayment % 25) === 0) {
        let getQuarterCount = overPayment / 25;
        quarters = getQuarterCount;
        overPayment -= (getQuarterCount * 25);
      } else if ( (overPayment / 25) > 1 ) {
        let divisionResult = Math.floor(overPayment/25);
        quarters = divisionResult;
        overPayment = overPayment - (divisionResult * 25);
      }
    
      //count dimes

      if ( (overPayment/10) === 1) {
        dimes = 1;
        overPayment -= 10;
      } else if ( (overPayment % 10) === 0) {
        let getDimeCount = overPayment / 10;
        dimes = getDimeCount;
        overPayment -= (getDimeCount * 10);
      } else if ( (overPayment / 10) > 1 ) {
        let divisionResult = Math.floor(overPayment/10);
        dimes = divisionResult;
        overPayment -= (divisionResult * 10);
      } 
    
      //count nickels
    
      if ( (overPayment/5) === 1) {
        nickels = 1;
        overPayment -= 5;
      } else if ( (overPayment % 5) === 0) {
        let getNickelCount = overPayment / 5;
        console.log(getNickelCount);
        nickels = getNickelCount;
        overPayment -= (getNickelCount * 5);
      } else if ( (overPayment / 5) > 1 ) {
        let divisionResult = Math.floor(overPayment/5);
        nickels = divisionResult;
        overPayment -= (divisionResult * 5);
      } 
    
      // remainder is all pennys  
      pennys = overPayment;  
   
  
    console.log(`Quarters: ${quarters}`);
    console.log(`Dimes: ${dimes}`);
    console.log(`Nickels: ${nickels}`);
    console.log(`Pennys: ${pennys}`);
  
    return {
      twentys: twentys,
      tens: tens,
      fives: fives,
      dollars: singles,
      quarters: quarters,
      dimes: dimes,
      nickels: nickels,
      pennys: pennys
    }
  }


  /* generic rounding function */

  let roundTheNumbers = (value, decimals) => {
    let roundedNumber = Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    console.log(`rounded number: ${roundedNumber}`);
    return roundedNumber;
  }

  });

});