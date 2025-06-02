'use client';

/**
 * @class Stat
 * @description Representa una estadística individual
 */
class Stat {
    constructor(label, value, icon, color) {
        this.label = label;
        this.value = value;
        this.icon = icon;
        this.color = color;
    }
}

/**
 * @class StatCard
 * @description Tarjeta visual para una estadística
 */
class StatCard {
    constructor(stat) {
        this.stat = stat;
    }

    render() {
        return (
            <div className="bg-green-50 rounded-2xl p-5 flex flex-col justify-between min-h-[110px]">
                <div className="flex items-start justify-between w-full">
                    <div>
                        <div className="font-semibold text-gray-800 text-base mb-1">{this.stat.label}</div>
                        <div className="text-lg font-bold text-gray-900">{this.stat.value}</div>
                    </div>
                    <div className="text-green-500 flex-shrink-0 ml-2">{this.stat.icon}</div>
                </div>
            </div>
        );
    }
}

/**
 * @class DashboardStats
 * @description Componente principal de estadísticas del dashboard
 */
class DashboardStats {
    constructor() {
        this.stats = [
            new Stat(
                'Calories Burned',
                '1,250',
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v2m0 4v2m0 4v2m0 4v2m-6-6h2m4 0h2m4 0h2" /></svg>,
                'red'
            ),
            new Stat(
                'Workouts',
                '5',
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2" /></svg>,
                'green'
            ),
            new Stat(
                'Active Minutes',
                '210',
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                'blue'
            ),
            new Stat(
                'Challenges Completed',
                '2',
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
                'purple'
            )
        ];
    }

    render() {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {this.stats.map((stat, idx) => {
                    const card = new StatCard(stat);
                    return <div key={idx}>{card.render()}</div>;
                })}
            </div>
        );
    }
}

/**
 * @function DashboardStatsContainer
 * @description Componente contenedor para las estadísticas del dashboard
 */
export default function DashboardStatsContainer() {
    const stats = new DashboardStats();
    return stats.render();
} 