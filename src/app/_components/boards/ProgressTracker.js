'use client';

import { ReactNode } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * @class ChartData
 * @description Clase para manejar los datos de un gráfico
 */
class ChartData {
    constructor(labels, values) {
        this.labels = labels;
        this.values = values;
        this.maxValue = Math.max(...values, 1);
    }

    getValueHeight(index) {
        const heightPercentage = (this.values[index] / this.maxValue) * 100;
        return `${heightPercentage}%`;
    }
}

/**
 * @class ProgressChart
 * @description Clase para manejar el componente de gráfico de progreso
 */
class ProgressChart {
    constructor(title, subtitle, data, color, icon) {
        this.title = title;
        this.subtitle = subtitle;
        this.data = data;
        this.color = color;
        this.icon = icon;
    }

    render() {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="font-bold text-gray-800">{this.title}</h3>
                        <p className="text-xs text-gray-500">{this.subtitle}</p>
                    </div>
                    <div className="text-gray-400">
                        {this.icon}
                    </div>
                </div>
                
                <div className="h-64 flex items-end justify-between">
                    {this.data.values.map((value, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                            <div className="w-full px-1">
                                <div 
                                    className={`w-full ${this.color} rounded-sm`} 
                                    style={{ 
                                        height: this.data.getValueHeight(index),
                                        minHeight: value > 0 ? '4px' : '0' 
                                    }}
                                ></div>
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                                {this.data.labels[index]}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

/**
 * @class StatItem
 * @description Clase para manejar el componente de elemento de estadística
 */
class StatItem {
    constructor(value, label, icon, color) {
        this.value = value;
        this.label = label;
        this.icon = icon;
        this.color = color;
    }

    render() {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className={`text-${this.color}-500 mb-4`}>
                    {this.icon}
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">
                    {this.value}
                </div>
                <div className="text-sm text-gray-500">
                    {this.label}
                </div>
            </div>
        );
    }
}

// POO: Clase para datos de gráfico de líneas
class LineChartData {
    constructor(labels, calories, duration) {
        this.labels = labels;
        this.calories = calories;
        this.duration = duration;
        this.maxCalories = Math.max(...calories, 1);
        this.maxDuration = Math.max(...duration, 1);
    }
}

// POO: Clase para datos de gráfico de barras
class BarChartData {
    constructor(labels, values) {
        this.labels = labels;
        this.values = values;
        this.maxValue = Math.max(...values, 1);
    }
}

// POO: Componente gráfico de líneas mock SVG
function LineChart({ data }) {
    // Generar puntos para el SVG
    const width = 320, height = 120, padding = 30;
    const points = (arr, max) => arr.map((v, i) => {
        const x = padding + i * ((width - 2 * padding) / (arr.length - 1));
        const y = height - padding - (v / max) * (height - 2 * padding);
        return [x, y];
    });
    const calPts = points(data.calories, data.maxCalories);
    const durPts = points(data.duration, data.maxDuration);
    const toPath = pts => pts.map((p, i) => i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`).join(' ');
    return (
        <svg width={width} height={height} className="w-full h-32">
            {/* Ejes */}
            <line x1={padding} y1={height-padding} x2={width-padding} y2={height-padding} stroke="#e5e7eb" strokeWidth={2}/>
            <line x1={padding} y1={padding} x2={padding} y2={height-padding} stroke="#e5e7eb" strokeWidth={2}/>
            {/* Calorías */}
            <path d={toPath(calPts)} fill="none" stroke="#22c55e" strokeWidth={2} />
            {calPts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={3} fill="#22c55e" />)}
            {/* Duración */}
            <path d={toPath(durPts)} fill="none" stroke="#60a5fa" strokeWidth={2} />
            {durPts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={3} fill="#60a5fa" />)}
            {/* Etiquetas X */}
            {data.labels.map((lbl, i) => {
                const x = padding + i * ((width - 2 * padding) / (data.labels.length - 1));
                return <text key={lbl} x={x} y={height-8} textAnchor="middle" fontSize="12" fill="#6b7280">{lbl}</text>;
            })}
        </svg>
    );
}

// POO: Componente gráfico de barras mock SVG
function BarChart({ data }) {
    const width = 340, height = 100, padding = 36;
    const barW = 28;
    const gap = 48;
    return (
        <svg width={width} height={height + 28} className="w-full h-32">
            {data.values.map((v, i) => {
                const x = padding + i * (barW + gap);
                const y = height - padding - (v / data.maxValue) * (height - 2 * padding);
                return (
                    <g key={i}>
                        <rect x={x} y={y} width={barW} height={height-padding-y} rx={6} fill="#22c55e" />
                        <text x={x+barW/2} y={height+22} textAnchor="middle" fontSize="12" fill="#6b7280">{data.labels[i]}</text>
                    </g>
                );
            })}
        </svg>
    );
}

// POO: Tarjeta de estadística
function StatCard({ value, label }) {
    return (
        <div className="bg-green-50 rounded-2xl flex flex-col items-center justify-center py-6 px-4 min-w-[140px]">
            <span className="text-2xl font-bold text-gray-800 mb-1">{value}</span>
            <span className="text-xs text-gray-500 text-center">{label}</span>
        </div>
    );
}

// POO: Quick Action
function QuickAction({ icon, label, onClick }) {
    return (
        <div
            className="flex flex-col items-center justify-center bg-white rounded-2xl py-6 px-4 shadow-sm hover:shadow-md transition cursor-pointer min-w-[140px]"
            onClick={onClick}
        >
            <div className="mb-2 text-green-500 bg-green-50 rounded-full w-14 h-14 flex items-center justify-center text-2xl">{icon}</div>
            <span className="text-base font-semibold text-gray-700 mt-2">{label}</span>
        </div>
    );
}

/**
 * @function ProgressTracker
 * @description Componente que muestra el seguimiento del progreso
 */
export default function ProgressTracker() {
    // Datos mock
    const lineData = new LineChartData(
        ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        [320, 340, 360, 400, 420, 440, 300], // Calories
        [40, 50, 60, 70, 80, 75, 30] // Duration
    );
    const barData = new BarChartData(
        ['Workouts','Streak','Goals','Badges'],
        [100, 25, 15, 10]
    );
    const stats = [
        { value: 248, label: 'Workouts Completed' },
        { value: 42, label: 'Achievements Earned' },
        { value: 15, label: 'Active Groups' },
        { value: '87%', label: 'Goal Completion Rate' },
    ];

    const quickActions = [
        { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>, label: 'Log Activity' },
        { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, label: 'Join Group' },
        { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, label: 'Set Timer' },
        { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>, label: 'Send Nudge' },
        { icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18h18" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V9a3 3 0 016 0v8" /></svg>, label: 'View Stats' },
    ];

    const router = useRouter();

    return (
        <section className="bg-green-50 rounded-2xl p-8 mt-8">
            <h2 className="text-2xl font-extrabold text-center text-gray-800 mb-2">Track Your Progress</h2>
            <p className="text-center text-gray-500 mb-8">Visualize your fitness journey with intuitive graphs and detailed statistics.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Gráfico de líneas */}
                <div className="bg-white rounded-2xl p-8 flex flex-col shadow-sm min-h-[270px]">
                    <div className="flex items-center justify-between mb-4">
                        <span className="font-semibold text-gray-800">Workout Activity</span>
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    </div>
                    <span className="text-xs text-gray-500 mb-4">Your weekly training overview</span>
                    <LineChart data={lineData} />
                    <div className="flex gap-6 mt-6 text-xs">
                        <span className="flex items-center gap-1"><span className="inline-block w-3 h-2 rounded bg-green-500"></span>Calories Burned</span>
                        <span className="flex items-center gap-1"><span className="inline-block w-3 h-2 rounded bg-blue-400"></span>Workout Duration (min)</span>
                    </div>
                </div>
                {/* Gráfico de barras */}
                <div className="bg-white rounded-2xl p-8 flex flex-col shadow-sm min-h-[270px]">
                    <div className="flex items-center justify-between mb-4">
                        <span className="font-semibold text-gray-800">Achievements</span>
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    </div>
                    <span className="text-xs text-gray-500 mb-4">Your fitness milestones</span>
                    <BarChart data={barData} />
                </div>
            </div>
            {/* Tarjetas de estadísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {stats.map((s, i) => <StatCard key={i} value={s.value} label={s.label} />)}
            </div>
            {/* Quick Actions al final del recuadro */}
            <div className="mt-10">
                <h3 className="text-lg font-semibold text-gray-700 mb-5 text-center">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {quickActions.map((q, i) => (
                        <QuickAction
                            key={i}
                            icon={q.icon}
                            label={q.label}
                            onClick={q.label === 'Log Activity' ? () => router.push('/activities') : undefined}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
} 