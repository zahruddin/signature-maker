let canvas = document.getElementById('thecanvas');
        let clearButton = document.querySelector('.btn-primary');
        let downloadButton = document.querySelector('.btn-success');

        function canvas_read_mouse(canvas, e) {
            let canvasRect = canvas.getBoundingClientRect();
            canvas.tc_x1 = canvas.tc_x2;
            canvas.tc_y1 = canvas.tc_y2;
            canvas.tc_x2 = e.clientX - canvasRect.left;
            canvas.tc_y2 = e.clientY - canvasRect.top;
        }

        function on_canvas_mouse_down(e) {
            canvas_read_mouse(canvas, e);
            canvas.tc_md = true;
        }

        function on_canvas_mouse_up(e) {
            canvas.tc_md = false;
        }

        function on_canvas_mouse_move(e) {
            canvas_read_mouse(canvas, e);
            if (canvas.tc_md && (canvas.tc_x1 !== canvas.tc_x2 || canvas.tc_y1 !== canvas.tc_y2)) {
                let ctx = canvas.getContext("2d");
                ctx.beginPath();
                ctx.moveTo(canvas.tc_x1, canvas.tc_y1);
                ctx.lineTo(canvas.tc_x2, canvas.tc_y2);
                ctx.strokeStyle = "black"; // Set warna garis menjadi hitam
                ctx.lineWidth = 2; // Set ketebalan garis
                ctx.stroke();
            }
        }

        function canvas_read_touch(canvas, e) {
            let canvasRect = canvas.getBoundingClientRect();
            let touch = e.touches[0];
            canvas.tc_x1 = canvas.tc_x2;
            canvas.tc_y1 = canvas.tc_y2;
            canvas.tc_x2 = touch.pageX - document.documentElement.scrollLeft - canvasRect.left;
            canvas.tc_y2 = touch.pageY - document.documentElement.scrollTop - canvasRect.top;
        }

        function on_canvas_touch_start(e) {
            canvas_read_touch(canvas, e);
            canvas.tc_md = true;
        }

        function on_canvas_touch_end(e) {
            canvas.tc_md = false;
        }

        function on_canvas_touch_move(e) {
            canvas_read_touch(canvas, e);
            if (canvas.tc_md && (canvas.tc_x1 !== canvas.tc_x2 || canvas.tc_y1 !== canvas.tc_y2)) {
                let ctx = canvas.getContext("2d");
                ctx.beginPath();
                ctx.moveTo(canvas.tc_x1, canvas.tc_y1);
                ctx.lineTo(canvas.tc_x2, canvas.tc_y2);
                ctx.strokeStyle = "black"; // Set warna garis menjadi hitam
                ctx.lineWidth = 2; // Set ketebalan garis
                ctx.stroke();
            }
        }

        function clearCanvas() {
            let ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        function downloadImage() {
            let link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'signature.png';
            link.click();
        }

        canvas.addEventListener('mousedown', (e) => {
            on_canvas_mouse_down(e)
        }, false);
        canvas.addEventListener('mouseup', (e) => {
            on_canvas_mouse_up(e)
        }, false);
        canvas.addEventListener('mousemove', (e) => {
            on_canvas_mouse_move(e)
        }, false);
        canvas.addEventListener('touchstart', (e) => {
            on_canvas_touch_start(e)
        }, false);
        canvas.addEventListener('touchend', (e) => {
            on_canvas_touch_end(e)
        }, false);
        canvas.addEventListener('touchmove', (e) => {
            on_canvas_touch_move(e)
        }, false);
