import {Grid, Typography} from "@mui/material";
import DateRangeIcon from '@mui/icons-material/DateRange';
import ExtensionIcon from '@mui/icons-material/Extension';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TagIcon from '@mui/icons-material/Tag';
import PaidIcon from '@mui/icons-material/Paid';

const DetailsPageBottomBox = ({id, name, number_of_pieces, year_released, min_price, max_price}) => {

  const legoDetailsArray = [
    {
      logo: <TagIcon className="details-icon"/>,
      value: id,
      text: 'Cikkszám'
    },
    {
      logo: <LocalOfferIcon className="details-icon"/>,
      value: name,
      text: 'Név'
    },
    {
      logo: <ExtensionIcon className="details-icon"/>,
      value: number_of_pieces,
      text: 'Darabszám'
    },
    {
      logo: <DateRangeIcon className="details-icon"/>,
      value: year_released,
      text: 'Megjelenés'
    },
    {
      logo: <PaidIcon className="details-icon"/>,
      value: `${parseInt(min_price).toLocaleString()} - ${parseInt(max_price).toLocaleString()} Ft`,
      text: 'Ár'
    }
  ]
  return (
    <Grid container justifyContent={'space-around'}>
      {legoDetailsArray.map((data, index) => {
          const hideLastElement = index + 1 === legoDetailsArray.length;
          return (
            < Grid key={index} item xs={10} sm={6} md={2} container direction={'column'} alignItems={'center'}
                   className="margin-sm details-box">
              {data.logo}
              <Typography
                variant="h4"
                children={
                  <p className="details-value">{data.value}</p>
                }
              />
              <Typography
                variant="subtitle1"
                children={
                  <p className="details-text">{data.text}</p>
                }
              />
              <hr className="full-width separator-horizontal"
                  style={{visibility: hideLastElement ? 'hidden' : 'visible'}}/>
              <hr className="full-width separator-vertical" style={{display: hideLastElement ? 'none ' : 'block'}}/>
            </Grid>
          )
        }
      )}


    </Grid>
  );
};

export default DetailsPageBottomBox;
