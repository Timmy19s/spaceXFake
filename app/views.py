from django.views.generic import TemplateView



# Доменное имя
class Index_view(TemplateView):
    template_name = 'app/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context
