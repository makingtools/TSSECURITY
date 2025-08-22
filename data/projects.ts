import type { Project } from '../types';

export const projects: Project[] = [
    {
        id: 1,
        client: 'WISP Regional en Cundinamarca',
        title: 'Optimización y Redundancia de Red ISP',
        category: 'Redes ISP',
        imageUrl: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOT二次&ixlib=rb-4.0.3&q=80&w=800',
        challenge: 'El cliente sufría caídas constantes del servicio en horas pico, generando quejas masivas y pérdida de suscriptores debido a una red saturada y sin redundancia.',
        solution: 'Se implementó un sistema de balanceo de cargas con dos proveedores de internet y se reconfiguró la red con enrutamiento dinámico OSPF para crear rutas alternativas automáticas. Se optimizaron las antenas para reducir interferencias.',
        results: [
            { icon: '✅', text: 'Reducción del 95% en las interrupciones del servicio.' },
            { icon: '🚀', text: 'Aumento del 50% en la velocidad promedio para los clientes.' },
            { icon: '📈', text: 'Crecimiento del 30% en nuevos suscriptores en 6 meses.' }
        ]
    },
    {
        id: 2,
        client: 'Empresa de Logística en Bogotá',
        title: 'Infraestructura Segura de Red y CCTV',
        category: 'Seguridad Empresarial',
        imageUrl: 'https://images.unsplash.com/photo-1600866120478-3059427db037?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOT二次&ixlib=rb-4.0.3&q=80&w=800',
        challenge: 'La empresa necesitaba proteger sus bodegas y oficinas con un sistema de vigilancia moderno y centralizado, además de segmentar su red para proteger los datos críticos de logística.',
        solution: 'Se instaló un sistema de CCTV IP con 32 cámaras y acceso remoto. Se implementó un firewall Fortinet para segmentar la red en zonas (invitados, empleados, servidores) y se configuró una VPN para el acceso seguro de los gerentes desde fuera de la oficina.',
        results: [
            { icon: '🛡️', text: 'Cobertura de vigilancia del 100% en áreas críticas.' },
            { icon: '🔒', text: 'Cero incidentes de acceso no autorizado a la red interna.' },
            { icon: '💼', text: 'Acceso remoto seguro y estable para el equipo directivo.' }
        ]
    },
     {
        id: 3,
        client: 'Hotel Boutique en Cartagena',
        title: 'Portal Cautivo y Red WiFi para Huéspedes',
        category: 'Redes Hoteleras',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOT二次&ixlib=rb-4.0.3&q=80&w=800',
        challenge: 'El hotel ofrecía una red WiFi abierta, lenta y sin control, lo que resultaba en mala experiencia para los huéspedes y abuso del ancho de banda.',
        solution: 'Se implementó un sistema Hotspot con portal cautivo personalizado. Se crearon planes de acceso diferenciados (gratuito básico y premium de pago) y se instalaron access points de alta densidad para garantizar cobertura total.',
        results: [
            { icon: '📶', text: 'Mejora del 80% en la satisfacción de los huéspedes con el WiFi.' },
            { icon: '💰', text: 'Nueva fuente de ingresos a través de los planes premium.' },
            { icon: '📊', text: 'Control total sobre el uso de la red y acceso a estadísticas.' }
        ]
    }
];
