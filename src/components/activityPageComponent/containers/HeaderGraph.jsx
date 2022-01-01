import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import Skeleton from '@mui/material/Skeleton';
import PropTypes from 'prop-types';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

/**
 * HeaderGraph: includes the graph of activity and three buttons of changeing the acitivty (new following, total following and notes)
 * @function HeaderGraph
 * @property {array} dates - array contains dates
 * @property {function} notes -array contains notes
 * @property {boolean} nF - array contains new following
 * @property {function} tF - array contains total following
 * @property {number} notesCount - number of notesCount
 * @property {number} tFCount - number of total following
 * @property {number} nFCount - number of new following
 * @property {boolean} loading - loading indicates if the page is loading
 * @returns {Component}  includes the graph of activity and three buttons of changeing the acitivty (new following, total following and nots)
 */
export default function HeaderGraph(props) {
    const [activeLink, setActiveLink] = useState(0);
    const colors = ['#00B8FF', '#FF62CE', '#00CF35'];
    const name = ['Notes', 'New followers', 'Total followers'];
    //const loading = false;
    const { dates, notes, nF, tF, loading, notesCount, nFCount, tFCount } =
        props;
    const data = {
        labels: dates,
        datasets: [
            {
                label: name[activeLink],
                fill: false,
                lineTension: 0.1,
                backgroundColor: colors[activeLink],
                borderColor: colors[activeLink],
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: activeLink === 0 ? notes : activeLink === 1 ? nF : tF
            }
        ]
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            labels: {
                color: '#fff'
            }
        },
        scales: {
            y: {
                ticks: {
                    color: '#fff'
                }
            },
            x: {
                ticks: {
                    color: '#fff'
                }
            }
        }
    };

    return (
        <div className="graph">
            <div className="Lhead">Last week</div>
            <div className="gra">
                {loading ? (
                    <Skeleton height={400} />
                ) : (
                    <Line data={data} options={options} />
                )}
            </div>
            <div className="btns">
                <span
                    className={`box ${activeLink === 0 ? 'active0' : ''}`}
                    onClick={() => setActiveLink(0)}
                >
                    <span>{notesCount}</span>
                    <span>Notes</span>
                </span>
                <span
                    className={`box ${activeLink === 1 ? 'active1' : ''}`}
                    onClick={() => setActiveLink(1)}
                >
                    <span>{nFCount}</span>
                    <span>New followers</span>
                </span>
                <span
                    className={`box ${activeLink === 2 ? 'active2' : ''}`}
                    onClick={() => setActiveLink(2)}
                >
                    <span>{tFCount}</span>
                    <span>Total followers</span>
                </span>
            </div>
        </div>
    );
}
HeaderGraph.propTypes = {
    dates: PropTypes.array.isRequired,
    notes: PropTypes.array.isRequired,
    nF: PropTypes.array.isRequired,
    tF: PropTypes.array.isRequired,
    notesCount:PropTypes.number.isRequired,
    nFCount:PropTypes.number.isRequired,
    tFCount:PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired
};
