import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import '../styles/Gallery.css';

const mockData = {
  'page1': [
    {
      'thumbnail': 'http://cdn.digital-photo-secrets.com/images/bedside-lamp-large.jpg',
      'title': 'Bedside Lamp'
    },
    {
      'thumbnail': 'https://i.pinimg.com/736x/97/f3/09/97f3098a80a8b9d81eeb623125b687de--telephone-table-household-items.jpg',
      'title': 'Wooden Table'
    },
    {
      'thumbnail': 'http://img.loccitane.com/P.aspx?l=en-GB&s=300&e=png&name=roses-et-reines-eau-de-toilette&id=24ET075R14&v=2',
      'title': 'Perfume'
    },
    {
      'thumbnail': 'http://www.clickover.com/images/s_5/Everyday_antique_household_items_7bb8e4f501aa05db3b66_3.jpg',
      'title': 'Fan'
    },
    {
      'thumbnail': 'https://i.pinimg.com/736x/c0/7b/48/c07b4831470d2762cb00ef5f80ebc908--french-collection-household-items.jpg',
      'title': 'Mincer'
    },
    {
      'thumbnail': 'https://i.pinimg.com/736x/f1/cf/4b/f1cf4bed7364773423da9d997333b08a--hand-mixer-s-house.jpg',
      'title': 'Egg Beater'
    },
    {
      'thumbnail': 'https://i.pinimg.com/236x/09/19/ca/0919ca856b8ed477a94809a00e1fe8e3--up-cycle-household-items.jpg',
      'title': 'Kitchen Utility Set'
    },
    {
      'thumbnail': 'https://www.dhresource.com/260x260s/f2-albu-g1-M01-BA-71-rBVaGVbNEM2ARmvqAANrtRcYKdQ566.jpg/bathroom-shelf-hair-dryer-holder-wall-hang.jpg',
      'title': 'Blow Drier'
    }
  ],
  'page2': [
    {
      'thumbnail': 'https://sc02.alicdn.com/kf/HTB1wAIgFFXXXXcpaFXXq6xXFXXXl/200510711/HTB1wAIgFFXXXXcpaFXXq6xXFXXXl.jpg',
      'title': 'Swiffer'
    },
    {
      'thumbnail': 'https://www.google.com/search?q=household+items&tbm=isch&tbs=rimg:CSm3kdn-dN5yIjjPG4bPhrajKinfA_1OtFx6Ll_1BzeRK5hRDQi3rcHCPaMVXoEVQdzQphDWRHnQQ_1oPcZkqjVcJHFLioSCc8bhs-GtqMqEfL5NVbCh_1GwKhIJKd8D860XHosRMPi8TIulgnoqEgmX8HN5ErmFEBE490rPxcD8MioSCdCLetwcI9oxESSFgWeuD6qwKhIJVegRVB3NCmERmAu71hTbNn8qEgkNZEedBD-g9xECDnYGi56aqSoSCRmSqNVwkcUuET6lAMdBDesk&tbo=u&sa=X&ved=0ahUKEwjkxr7r95XWAhVFfiYKHe6wCN0Q9C8IHw&biw=1293&bih=467&dpr=2#imgrc=-pi8yD3646aZDM:',
      'title': 'Blender'
    },
    {
      'thumbnail': 'http://eurlturquetbatiment.com/wp-content/uploads/2017/01/decorative-home-items-unique-decorative-home-items-.jpg',
      'title': 'Vase'
    },
    {
      'thumbnail': 'https://i.pinimg.com/736x/7d/fe/08/7dfe08523ea732d7f9401308f92f5a68--cow-skull-household-items.jpg',
      'title': 'Cow skull'
    },
    {
      'thumbnail': 'https://ae01.alicdn.com/kf/HTB1QxJMIpXXXXadaXXXq6xXFXXXU/2015-New-Sale-Ampulheta-Magnetic-Sand-Hourglass-Decorative-Household-Items-Characteristics-Of-Creative-Arts-And-Crafts.jpg',
      'title': 'Sand Hourglass'
    },
    {
      'thumbnail': 'http://cdnll.halegroves.com/images/xl/1n-navel-oranges-for-sale-online_04.jpg',
      'title': 'Oranges'
    },
    {
      'thumbnail': 'https://i.pinimg.com/736x/f4/cb/36/f4cb36e8c7cf7d7004151ad5bbfd5ad8--tea-service-household-items.jpg',
      'title': 'Tea Kettle'
    },
    {
      'thumbnail': 'https://images-na.ssl-images-amazon.com/images/I/41pqonTSZoL._SY300_.jpg',
      'title': 'USB Cable'
    }
  ],
  'page3': [
    {
      'thumbnail': 'https://cnet4.cbsistatic.com/img/TWgWDpA6qP4YAf9t7H6ylZDTMNA=/fit-in/770x578/2013/08/09/01997caa-6de1-11e3-913e-14feb5ca9861/DSC_0113.jpg',
      'title': 'Cable Modem'
    },
    {
      'thumbnail': 'http://cdn.activly.com/wp-content/uploads/2017/07/Fresh-lemons-on-the-rustic-tale.jpg',
      'title': 'Lemons'
    },
    {
      'thumbnail': 'http://www.atomictimeclock.com/tm295/images/NullModemCable.jpg',
      'title': 'Printer Cable'
    },
    {
      'thumbnail': 'https://i5.walmartimages.com/asr/388fa13a-75ea-4bbe-b750-b5c82fb84d30_1.3f23b57ef5456f41163350e688e1a9ee.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF',
      'title': 'Ladder'
    },
    {
      'thumbnail': 'http://s.hswstatic.com/gif/power-drill-1.jpg',
      'title': 'Power Drill'
    },
    {
      'thumbnail': 'https://steptohealth.com/wp-content/uploads/2015/09/1-cilantro.jpg',
      'title': 'Cilantro'
    },
    {
      'thumbnail': 'https://assets2.classic-assets.com/product_photo/48089/large_seating-tuscan-cafe_-chair-cb.tcwfw-main_1471510644.jpg',
      'title': 'Chair'
    },
    {
      'thumbnail': 'https://image.smythstoys.com/images/main-categories/baby/baby-hub-travel-cots.jpg',
      'title': 'Pack and Play'
    }
  ]
};

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      hasMoreItems: true,
      nextHref: null,
    };
  }

  loadItems(page) {
    var url = 'page1';
    if (this.state.nextHref) {
      url = this.state.nextHref;
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // copy items
        const pageNumber = parseInt(url.split('page')[1], 10);

        if (pageNumber <= 3) {
          const currentItems = this.state.items.slice();
          const items = currentItems.concat(mockData[url]);

          this.setState({
            items: items,
            nextHref: 'page' + (pageNumber + 1),
          });
        } else {
          this.setState({
            hasMoreItems: false,
          });
        }

      }, this);
    }, 1000);
  }

  render() {
    const loader = <div className="loader">Loading ...</div>;

    const items = this.state.items.map(function(item, i) {
      return (
        <div className="item mb4" key={i}>
          <a className="db center tc black link dim"
             title="Frank Ocean's Blonde on Apple Music"
             href="#">

            <img className="ba b--black-10"
                 alt={item.title}
                 src={item.thumbnail} width="200" height="200" />

            <b className="db mt2 f6 lh-copy">{item.title}</b>
          </a>
          <button className='f6 link dim ba ph3 pv2 mb2 mt2 db white bg-dark-blue'>Me sirve</button>
        </div>
      );
    });

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadItems.bind(this)}
        hasMore={this.state.hasMoreItems}
        loader={loader}
      >
        <div className="items pt4">
          {items}
        </div>
      </InfiniteScroll>
    );
  }
}

export default Gallery;
