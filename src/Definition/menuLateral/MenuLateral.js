import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function VerticalTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <div className="row">
                <div className="col-12 col-sm-3">
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        className={classes.tabs}
                    >
                        <Tab label="INFORMACIÓN" {...a11yProps(0)} />
                        <Tab label="SÍNTOMAS" {...a11yProps(1)} />
                        <Tab label="PREVENCIÓN" {...a11yProps(2)} />
                    </Tabs>
                </div>
                <div className="col-12 col-sm-9">
                    <TabPanel value={value} index={0}>
                        <div>
                            <p> El nuevo coronavirus SARS - CoV - 2, que produce la enfermedad conocida como <strong>Covid - 19</strong> , mantiene en vilo al mundo entero.Europa, con las fronteras cerradas y millones de ciudadanos confinados en sus casas, se ha convertido en el foco principal del brote, que se originó en China a finales de diciembre. El continente americano teme ser la siguiente víctima por la <strong>rápida extensión de los contagios</strong> en EE.UU.Hasta ahora han muerto más de 53.000 personas, casi la mitad en Italia y España, y hay más de un millón de casos confirmados en todo el mundo. </p>
                            <p>El virus se propaga principalmente de persona a persona, sobre todo mediante gotículas respiratorias que se producen cuando una persona infectada <strong>tose o estornuda</strong>. Estas gotitas pueden llegar a la boca o la nariz de las personas que se encuentren cerca y posiblemente entrar a los pulmones al respirar.
                            Las gotas con el virus también se pueden depositar en diferentes <strong>superficies y objetos</strong>, que al tocarlos se pueden incorporar a las manos, lo que es potencialmente infeccioso si la persona luego con esa misma mano se <strong>toca la boca, la nariz y posiblemente los ojos</strong>.</p> 
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <p> Los síntomas descritos para la neumonía de Wuhan provocada por el nuevo coronavirus son <strong>fiebre, dolor de cabeza y fatiga</strong>, acompañados de tos seca y sequedad y, en muchos casos, de disnea <strong>(dificultad para respirar)</strong>. Estos síntomas se comparten con muchas patologías por lo que, para no saturar los servicios de salud y evitar nuevos contagios, el Ministerio de Sanidad recomienda <strong>llamar al 112 en caso de duda</strong>.</p>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <div>
                            <p> Los consejos divulgados por las autoridades sanitarias para evitar el contagio son <strong>lavarse las manos</strong> de manera frecuente y usar pañuelos o el codo para cubrirse la nariz y boca cuando se tose o estornuda. En cuanto al uso de mascarillas es imprescindible su uso <strong>si está infectado</strong>, sospecha que puede estarlo o está en contacto directo con los pacientes que portan el virus. </p>
                            <p>En caso de tener síntomas, en España las autoridades recomiendan <strong>llamar a los sanitarios</strong>, para que en el caso de estar infectado, no se propague el virus en los hospitales o se colapsen los servicios sanitarios. </p>
                        </div>
                    </TabPanel>
                </div>
            </div>
        </div>
    );
}
