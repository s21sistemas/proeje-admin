@php
    use Carbon\Carbon;
    $cliente = $orden->venta->cotizacion->sucursal->cliente->nombre_empresa ?? $orden->venta->cotizacion->nombre_empresa ?? 'N/A';
    $sucursal = $orden->venta->cotizacion->sucursal->nombre_empresa ?? 'N/A';
    $existe_empresa = $orden->venta->cotizacion->sucursal->cliente->nombre_empresa ?? false;
@endphp

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>QRs Recorrido - Orden {{ $orden->codigo_orden_servicio }}</title>
    <style>
        body {
            font-family: 'DejaVu Sans', sans-serif;
            font-size: 12px;
            color: #333;
            margin: 20px;
        }

        h1 {
            text-align: center;
            font-size: 22px;
            color: #1c3d6e;
            margin-bottom: 10px;
        }

        .info {
            background-color: #eef1f6;
            border-left: 5px solid #1c3d6e;
            padding: 10px 15px;
            margin-bottom: 25px;
            border-radius: 8px;
        }

        .info p {
            margin: 5px 0;
            font-size: 13px;
        }

        table.qr-table {
            width: 100%;
            border-collapse: collapse;
        }

        table.qr-table td {
            width: 50%;
            padding: 15px;
            text-align: center;
            vertical-align: top;
        }

        .qr-box {
            background: #f8f9fa;
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 10px;
        }

        .qr-box img {
            width: 150px;
            height: 150px;
            margin-bottom: 8px;
        }

        .qr-desc {
            margin-bottom: 8px;
            font-size: 14px;
            font-weight: bold;
            color: #1c3d6e;
        }
        .page-break {
            page-break-after: always;
        }
    </style>
</head>
<body>

    <h1>QRs de Recorrido</h1>

    <div class="info">
        <p><strong>Orden de Servicio:</strong> {{ $orden->codigo_orden_servicio }}</p>
        <p><strong>Cliente:</strong> {{ $cliente }}.</p>
        @if($existe_empresa)
            <p><strong>Sucursal:</strong> {{ $sucursal }}.</p>
        @endif
        <p><strong>Dirección del Servicio:</strong> {{ $orden->domicilio_servicio }}</p>
        <p><strong>Fecha de inicio del servicio:</strong> {{ Carbon::parse($orden->fecha_inicio)->format('d/m/Y') }}</p>
        <p><strong>Fecha de Impresión:</strong> {{ Carbon::now()->format('d/m/Y') }}</p>
    </div>

    <table class="qr-table">
        @foreach($puntos->chunk(2) as $pair)
            <tr>
                @foreach($pair as $punto)
                    <td>
                        <div class="qr-box">
                            <div class="qr-desc">
                                {{ $punto->nombre_punto }}<br>
                            </div>
                            <img src="data:image/svg+xml;base64,{{ $punto->image_base64 }}" alt="QR">
                        </div>
                    </td>
                @endforeach

                @if(count($pair) === 1)
                    <td style="width: 50%;"></td>
                @endif
            </tr>
        @endforeach
    </table>
</body>
</html>
