$(document).ready(
  function() {
    // NOTE: resetto il dataBase al 2018-01-01
    var dataBase = moment('2018-01-01');

    // NOTE: stampo titolo(mese inziale cioè gennaio)
    $('.container h1').text(dataBase.format('MMMM YYYY'));

    // NOTE: stampo i giorni e li coloro di gennaio di reset
    stampoGiorni(dataBase);
    coloraFestivi(dataBase);

    // NOTE: se clicco su prev stampo i giiorni li color e se se gennaio 2018 nascondo next
    $('.next').click(function() {
      dataBase.add(1, 'month');

      // NOTE: stampo giorni e giorni festivi del mese corrente
      stampoGiorni(dataBase);
      coloraFestivi(dataBase);

      // NOTE: stampo titolo(mese corrente)
      $('.container h1').text(dataBase.format('MMMM YYYY'));

      // NOTE: nascondo next se è l'ultimo mese
      if(dataBase.format('MMMM YYYY') === 'December 2018') {
        $('.next').hide();
      }else {
        $('.prev').show();
      }
    });

    // NOTE: se clicco su prev stampo i giiorni li color e se se gennaio 2018 nascondo prev
    $('.prev').click(function() {
      dataBase.subtract(1, 'month');

      // NOTE: stampo giorni e giorni festivi del mese corrente
      stampoGiorni(dataBase);
      coloraFestivi(dataBase);

      // NOTE: stampo titolo(mese corrente)
      $('.wrapper h1').text(dataBase.format('MMMM YYYY'));

      // NOTE: nascondo prev se è primo mese
      if (dataBase.format('MMMM YYYY') === 'January 2018') {
        $('.prev').hide();
      } else {
        $('.next').show();
      }
    });

    // NOTE: funzione per colorare i giorni festivi
    function coloraFestivi(dataBase) {
      // NOTE: AJAX
      $.ajax(
        {
          url:"https://flynn.boolean.careers/exercises/api/holidays",
          method: "GET",
          data: {
            year: dataBase.year(),
            month: dataBase.month()
          },
          success: function(giorniFestivi) {
            // NOTE: prendo i datti dall'api
            var festivi = giorniFestivi.response

            // NOTE: ciclole i giorni festivi e salvo il nome e la data della festivita
            for (var i = 0; i < festivi.length; i++) {
              var giornoFestivo = festivi[i];
              // console.log(giornoFestivo);

              var dataFestivo = giornoFestivo['date'];
              var nomeFestivo = giornoFestivo['name'];

              // NOTE: per gli li con attributo = alla data festivo gli appendo classe festivo e il nome della festività
              var giornoFestivoDaColorare = $('.days-list li[data-giorno-corrente="'+ dataFestivo +'"]');
              giornoFestivoDaColorare.addClass('festivo')
              giornoFestivoDaColorare.append(' ' + nomeFestivo)
            }
          },
          error: function() {
            alert('Errore')
          }
        });
    }

    // NOTE: funzione per stampare con handlebars
    function stampoGiorni(month) {

      $('.days-list').html('')
      var giorniNelMese = month.daysInMonth();

      var source = $('#day-template').html();
      var template = Handlebars.compile(source);
      for (var i = 1; i <= giorniNelMese; i++) {
        var singoloGiorno = moment({
          year: month.year(),
          month: month.month(),
          day: i,
        });

        var formatGiornoCorrent = singoloGiorno.format('YYYY-MM-DD')
        // console.log(formatGiornoCorrent);

        var context = {
          data: singoloGiorno.format('D MMMM'),
          currentDay: formatGiornoCorrent
        }
        var html = template(context);

        // NOTE: stampo i giorni
        $('.days-list').append(html);
      }
    }
  }
); 

// $(document).ready(
//   function(){
//     // // NOTE: array mesi
//     // var arrayMesi= moment().format(MMMM);
//     // console.log(arrayMesi);
//     //
//     // // NOTE: creo calendario
//     // var giorniAlMese = moment("2018-01", "YYYY-MM").daysInMonth();
//     //
//     // for (var i = 0; i < giorniAlMese; i++) {
//     //
//     //   // NOTE: creo la struttura html
//     //   var giorno = i + 1;
//     //   if (giorno.toString().length < 2) {
//     //     $('ul').append('<li>' +  giorno + ' Gennaio' + '<span class="hidden">'  +'2018-01-0'+ giorno + '</span>'+ '</li>');
//     //   }else {
//     //     $('ul').append('<li>' +  giorno + ' Gennaio' + '<span class="hidden">'  +'2018-01-'+ giorno + '</span>'+ '</li>');
//     //   }
//     //
//     //   // console.log($('li').find('span').text());
//     // }
//
//     // console.log(giorniAlMese);
//
//
//
//     // NOTE: soluzione scolozzi
//     var dataBase = moment({
//       day: 1,
//       month: 0,
//       year: 2018
//     });
//
//     // console.log(dataBase);
//
//     // NOTE: stampo gli li calcolando il nuimeor di giorni
//     var giorniAlMese = dataBase.daysInMonth();
//
//
//     // NOTE: handlebars
//     var source = $('day-template').html();
//     var template = Handlebars.compile(source);
//
//     for (var i = 1; i <= giorniAlMese; i++) {
//
//       var giornoCorrente = moment({
//         day: i,
//         month: dataBase.month(),
//         year: dataBase.year()
//       });
//
//
//       // NOTE: compilo tmep
//       var context = {
//         date: giornoCorrente.format('D MMMM'),
//       };
//       var html = template(context);
//
//       // NOTE: appendo
//       $('#giorni').append(html);
//     }
//
//     coloraFestività();
//     // aggiunge festivita
//     function coloraFestività(dataBase){
//       // NOTE: chiamo ajax
//       $.ajax(
//         {
//           url:'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0',
//           method:'GET',
//           // data: {
//           //   month: dataBase.month(),
//           //   year: dataBase.year(),
//           // },
//
//           success: function(dataFestiva){
//             var festivita = dataFestiva.response
//             console.log(dataFestiva);
//
//             for (var i = 0; i < festivita.length; i++) {
//               var festivitaCorrente = festivita[i];
//
//               $('li').each(
//                 function() {
//                   var liCorrente = $(this);
//
//                   var thisDate= $('li[data-current-day="' + liCorrente.date + '"]');
//
//                 }
//               );
//             }
//           },
//
//           error: function(){
//             alert('error')
//           }
//         }
//       );
//     }
//
//     // NOTE: ajax
//     // $.ajax(
//     //   {
//     //     url:'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0',
//     //     method:'GET',
//     //
//     //     success: function(dateApi){
//     //       var dateFestivita = dateApi.response
//     //
//     //
//     //
//     //       // NOTE: creo array con all'interno le date delle festivita
//     //       var arrayFestivita = [];
//     //       for (var j = 0; j < dateFestivita.length; j++) {
//     //
//     //         // console.log(dateFestivita[j].name);
//     //         // console.log(dateFestivita[j].date);
//     //         arrayFestivita.push(dateFestivita[j].date.toString());
//     //       }
//     //       // console.log(arrayFestivita);
//     //
//     //       // NOTE: faccio each su tutte le date
//     //       $('li').each(
//     //         function(){
//     //           // console.log($(this).find('span').text());
//     //
//     //           // NOTE: leggo la data html
//     //           var dataAttuale = $(this).find('span').text().toString();
//     //           // console.log(dataAttuale);
//     //
//     //           // NOTE: se arrayFestivita contiene la data attuale aggiungo classe festivo e gli appendo il nome della festivita
//     //           if (arrayFestivita.includes(dataAttuale)) {
//     //             // dataAttuale.addClass('festivo')
//     //             $(this).addClass('festivo');
//     //           }
//     //
//     //
//     //         }
//     //       );
//     //
//     //
//     //     },
//     //
//     //     error:
//     //     function() {
//     //       alert('Errore');
//     //     }
//     //   }
//     // );
//   }
// );
